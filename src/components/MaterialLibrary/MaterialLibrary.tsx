import { Container, CategorySection, CategoryTitle, MaterialList, MaterialItem, MaterialName, CategoryBadge, EmptyState } from './MaterialLibrary.styles';

interface MaterialFile {
  name: string;
  category: 'ley' | 'apunte' | 'preguntas';
  filePath: string;
}

export interface MaterialLibraryProps {
  materials: MaterialFile[];
}

export function MaterialLibrary({ materials }: MaterialLibraryProps) {
  const byCategory = materials.reduce(
    (acc, m) => {
      acc[m.category] = [...(acc[m.category] || []), m];
      return acc;
    },
    {} as Record<'ley' | 'apunte' | 'preguntas', MaterialFile[]>,
  );

  const categories: Array<{ key: 'ley' | 'apunte' | 'preguntas'; title: string }> = [
    { key: 'ley', title: 'Leyes' },
    { key: 'apunte', title: 'Apuntes' },
    { key: 'preguntas', title: 'Preguntas' },
  ];

  return (
    <Container>
      <h1>Biblioteca de materiales</h1>
      <p>Consulta los documentos disponibles para estudiar:</p>
      {categories.map((cat) => {
        const items = byCategory[cat.key] || [];
        return (
          <CategorySection key={cat.key}>
            <CategoryTitle>{cat.title}</CategoryTitle>
            {items.length === 0 ? (
              <EmptyState>No hay archivos en esta categoría.</EmptyState>
            ) : (
              <MaterialList>
                {items.map((item) => (
                  <MaterialItem key={item.filePath} category={item.category}>
                    <MaterialName>{item.name}</MaterialName>
                    <CategoryBadge category={item.category}>
                      {item.category}
                    </CategoryBadge>
                  </MaterialItem>
                ))}
              </MaterialList>
            )}
          </CategorySection>
        );
      })}
    </Container>
  );
}
