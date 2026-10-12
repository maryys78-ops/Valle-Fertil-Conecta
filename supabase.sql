create table if not exists public.solicitudes (
    id uuid primary key default gen_random_uuid(),
    nombre text not null,
    categoria text not null,
    lugar text not null,
    descripcion text not null,
    remuneracion numeric(12, 2) not null check (remuneracion >= 0),
    estado text not null default 'Pendiente'
        check (estado in ('Pendiente', 'Aceptado')),
    fecha text not null default to_char(current_date, 'DD/MM/YYYY'),
    created_at timestamptz not null default now()
);

alter table public.solicitudes enable row level security;

grant usage on schema public to anon;
grant select, insert, update, delete on public.solicitudes to anon;

drop policy if exists "Solicitudes visibles para todos" on public.solicitudes;
create policy "Solicitudes visibles para todos"
    on public.solicitudes for select to anon
    using (true);

drop policy if exists "Todos pueden crear solicitudes" on public.solicitudes;
create policy "Todos pueden crear solicitudes"
    on public.solicitudes for insert to anon
    with check (true);

drop policy if exists "Todos pueden actualizar solicitudes" on public.solicitudes;
create policy "Todos pueden actualizar solicitudes"
    on public.solicitudes for update to anon
    using (true)
    with check (true);

drop policy if exists "Todos pueden eliminar solicitudes" on public.solicitudes;
create policy "Todos pueden eliminar solicitudes"
    on public.solicitudes for delete to anon
    using (true);

insert into public.solicitudes (nombre, categoria, lugar, descripcion, remuneracion, estado, fecha)
select 'Maria Amarfil', 'Compras por Encargo',
       'Retiro de medicamentos con receta archivada en farmacia céntrica.',
       'Retiro de medicamentos con receta archivada en farmacia céntrica.',
       6500, 'Pendiente', '12/10/2026'
where not exists (
    select 1 from public.solicitudes
    where nombre = 'Maria Amarfil'
      and descripcion = 'Retiro de medicamentos con receta archivada en farmacia céntrica.'
);

insert into public.solicitudes (nombre, categoria, lugar, descripcion, remuneracion, estado, fecha)
select 'Carlos Fernandez', 'Compras por Encargo',
       'Adquisición de un repuesto electrónico en Peatonal Tucumán.',
       'Adquisición de un repuesto electrónico en Peatonal Tucumán.',
       6500, 'Pendiente', '12/10/2026'
where not exists (
    select 1 from public.solicitudes
    where nombre = 'Carlos Fernandez'
      and descripcion = 'Adquisición de un repuesto electrónico en Peatonal Tucumán.'
);

insert into public.solicitudes (nombre, categoria, lugar, descripcion, remuneracion, estado, fecha)
select 'Alberto Morales', 'Trámites y Gestiones',
       'Retiro de certificación en Mesa de Entradas del Centro Cívico.',
       'Retiro de certificación en Mesa de Entradas del Centro Cívico.',
       6500, 'Pendiente', '12/10/2026'
where not exists (
    select 1 from public.solicitudes
    where nombre = 'Alberto Morales'
      and descripcion = 'Retiro de certificación en Mesa de Entradas del Centro Cívico.'
);
