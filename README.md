# PASAPP

Aplicación web personal para estudiar para el examen de Productor Asesor de Seguros (PAS) en Argentina.

## Tecnologías
- React + TypeScript + Vite
- Styled Components
- SheetJS (xlsx) - lectura de Excel
- PDF.js - extracción de texto de PDF
- IndexedDB - persistencia local
- Vitest + ESLint

## Estructura
- `/public/data/{laws,notes,questions}` — materiales originales (no se suben a GitHub)
- `/src` — código fuente

## Scripts
- `npm run dev` — servidor de desarrollo
- `npm run build` — build estático
- `npm run test` — pruebas
- `npm run lint` — lint

## Almacenamiento
Los datos se guardan en IndexedDB del navegador. No se sincronizan entre dispositivos.
