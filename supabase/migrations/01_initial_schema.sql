-- ==============================================================================
-- AURA GASTRONOMIQUE - DATABASE INITIALIZATION SCHEMA (POSTGRESQL / SUPABASE)
-- ==============================================================================

-- 1. Extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "citext";

-- 2. Tabla de Perfiles (Extensión de auth.users con RBAC)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email CITEXT NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT NOT NULL CHECK (role IN ('superadmin', 'owner', 'manager', 'chef', 'waiter')) DEFAULT 'waiter',
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Tabla de Restaurantes (Soporte Multi-tenant / White-label)
CREATE TABLE IF NOT EXISTS public.restaurants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    currency_symbol TEXT NOT NULL DEFAULT '€',
    primary_accent TEXT NOT NULL DEFAULT '#E5C378',
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. Asignación de Staff a Restaurantes
CREATE TABLE IF NOT EXISTS public.restaurant_staff (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    profile_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    role TEXT NOT NULL CHECK (role IN ('owner', 'manager', 'chef', 'waiter')),
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(restaurant_id, profile_id)
);

-- 5. Categorías del Menú
CREATE TABLE IF NOT EXISTS public.categories (
    id TEXT NOT NULL,
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    label TEXT NOT NULL,
    display_order INT NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id, restaurant_id)
);

-- 6. Platos y Creaciones Culinarias
CREATE TABLE IF NOT EXISTS public.dishes (
    id TEXT NOT NULL,
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    category_id TEXT NOT NULL,
    name TEXT NOT NULL,
    tagline TEXT,
    description TEXT,
    price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
    portion_weight TEXT,
    prep_time_minutes INT NOT NULL DEFAULT 15,
    sommelier_pairing TEXT,
    origin_story TEXT,
    dietary_flags JSONB NOT NULL DEFAULT '{}'::jsonb,
    ingredients TEXT[] NOT NULL DEFAULT '{}',
    is_available BOOLEAN NOT NULL DEFAULT true,
    views_3d_count INT NOT NULL DEFAULT 0,
    orders_count INT NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    PRIMARY KEY (id, restaurant_id)
);

-- 7. Multimedia Polimórfica (Fotos, Videos, GIFs, Modelos 3D GLB y USDZ)
CREATE TABLE IF NOT EXISTS public.dish_media (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    dish_id TEXT NOT NULL,
    media_type TEXT NOT NULL CHECK (media_type IN ('image', 'video', 'gif', 'model3d_glb', 'model3d_usdz', 'poster')),
    url TEXT NOT NULL,
    thumbnail_url TEXT,
    aspect_ratio TEXT DEFAULT '16:9',
    file_size_bytes BIGINT,
    is_primary BOOLEAN NOT NULL DEFAULT false,
    display_order INT NOT NULL DEFAULT 0,
    metadata JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    FOREIGN KEY (dish_id, restaurant_id) REFERENCES public.dishes(id, restaurant_id) ON DELETE CASCADE
);

-- 8. Mesas del Restaurante
CREATE TABLE IF NOT EXISTS public.tables (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    table_number TEXT NOT NULL,
    qr_code_token TEXT UNIQUE DEFAULT uuid_generate_v4()::text,
    is_occupied BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    UNIQUE(restaurant_id, table_number)
);

-- 9. Comandas Consolidadas de Mesa
CREATE TABLE IF NOT EXISTS public.orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    restaurant_id UUID NOT NULL REFERENCES public.restaurants(id) ON DELETE CASCADE,
    table_id UUID REFERENCES public.tables(id) ON DELETE SET NULL,
    table_number TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('received', 'in_kitchen', 'served', 'paid', 'cancelled')) DEFAULT 'received',
    total_amount NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 10. Detalle de Platos en la Comanda
CREATE TABLE IF NOT EXISTS public.order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
    dish_id TEXT NOT NULL,
    dish_name TEXT NOT NULL,
    unit_price NUMERIC(10, 2) NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    special_notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- ==============================================================================
-- ÍNDICES DE ALTO RENDIMIENTO
-- ==============================================================================
CREATE INDEX IF NOT EXISTS idx_dishes_category ON public.dishes(restaurant_id, category_id);
CREATE INDEX IF NOT EXISTS idx_dishes_availability ON public.dishes(restaurant_id, is_available);
CREATE INDEX IF NOT EXISTS idx_dish_media_dish ON public.dish_media(dish_id, media_type);
CREATE INDEX IF NOT EXISTS idx_orders_status ON public.orders(restaurant_id, status);
CREATE INDEX IF NOT EXISTS idx_orders_table ON public.orders(restaurant_id, table_id);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) & POLICIES
-- ==============================================================================
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.restaurant_staff ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dishes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dish_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Políticas de Lectura Pública
CREATE POLICY "Public Read Categories" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Public Read Dishes" ON public.dishes FOR SELECT USING (is_available = true OR auth.role() = 'authenticated');
CREATE POLICY "Public Read Dish Media" ON public.dish_media FOR SELECT USING (true);
CREATE POLICY "Public Read Tables" ON public.tables FOR SELECT USING (true);

-- Creación de Comanda por Comensales
CREATE POLICY "Public Insert Orders" ON public.orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Insert Order Items" ON public.order_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Read Orders" ON public.orders FOR SELECT USING (true);
CREATE POLICY "Public Read Order Items" ON public.order_items FOR SELECT USING (true);

-- Permisos de Staff Autenticado
CREATE POLICY "Staff Manage Dishes" ON public.dishes FOR ALL TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.restaurant_staff rs
    WHERE rs.restaurant_id = dishes.restaurant_id
      AND rs.profile_id = auth.uid()
      AND rs.role IN ('owner', 'manager', 'chef')
));

CREATE POLICY "Staff Manage Media" ON public.dish_media FOR ALL TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.restaurant_staff rs
    WHERE rs.restaurant_id = dish_media.restaurant_id
      AND rs.profile_id = auth.uid()
      AND rs.role IN ('owner', 'manager', 'chef')
));

CREATE POLICY "Staff Update Orders" ON public.orders FOR UPDATE TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.restaurant_staff rs
    WHERE rs.restaurant_id = orders.restaurant_id
      AND rs.profile_id = auth.uid()
));

-- ==============================================================================
-- SUPABASE STORAGE BUCKET & POLICIES
-- ==============================================================================
INSERT INTO storage.buckets (id, name, public) 
VALUES ('menu-media', 'menu-media', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Media Access" ON storage.objects FOR SELECT USING (bucket_id = 'menu-media');
CREATE POLICY "Staff Upload Media" ON storage.objects FOR INSERT TO authenticated 
WITH CHECK (bucket_id = 'menu-media');
CREATE POLICY "Staff Modify Media" ON storage.objects FOR UPDATE TO authenticated 
USING (bucket_id = 'menu-media');
CREATE POLICY "Staff Delete Media" ON storage.objects FOR DELETE TO authenticated 
USING (bucket_id = 'menu-media');
