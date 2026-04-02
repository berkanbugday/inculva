import type { StructureBuilder } from 'sanity/desk'

const PRINCIPLES = [
  { id: 'perceivable', title: 'Perceivable', guidelines: ['1.1', '1.2', '1.3', '1.4'] },
  { id: 'operable', title: 'Operable', guidelines: ['2.1', '2.2', '2.3', '2.4', '2.5'] },
  { id: 'understandable', title: 'Understandable', guidelines: ['3.1', '3.2', '3.3'] },
  { id: 'robust', title: 'Robust', guidelines: ['4.1'] },
]

const GUIDELINE_NAMES: Record<string, string> = {
  '1.1': '1.1 Text Alternatives',
  '1.2': '1.2 Time-based Media',
  '1.3': '1.3 Adaptable',
  '1.4': '1.4 Distinguishable',
  '2.1': '2.1 Keyboard Accessible',
  '2.2': '2.2 Enough Time',
  '2.3': '2.3 Seizures and Physical Reactions',
  '2.4': '2.4 Navigable',
  '2.5': '2.5 Input Modalities',
  '3.1': '3.1 Readable',
  '3.2': '3.2 Predictable',
  '3.3': '3.3 Input Assistance',
  '4.1': '4.1 Compatible',
}

const GUIDE_CATEGORIES = [
  { id: 'seo', title: 'SEO' },
  { id: 'geo', title: 'GEO' },
  { id: 'aeo', title: 'AEO' },
  { id: 'technique', title: 'Techniques' },
  { id: 'best-practice', title: 'Best Practices' },
]

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Knowledge Base')
    .items([
      S.listItem()
        .title('WCAG Rules')
        .child(
          S.list()
            .title('WCAG Rules by Principle')
            .items(
              PRINCIPLES.map((principle) =>
                S.listItem()
                  .title(principle.title)
                  .child(
                    S.list()
                      .title(principle.title)
                      .items(
                        principle.guidelines.map((gl) =>
                          S.listItem()
                            .title(GUIDELINE_NAMES[gl] || gl)
                            .child(
                              S.documentList()
                                .title(GUIDELINE_NAMES[gl] || gl)
                                .filter(
                                  '_type == "wcagRule" && criterionNumber match $prefix'
                                )
                                .params({ prefix: `${gl}.*` })
                                .defaultOrdering([
                                  { field: 'criterionNumber', direction: 'asc' },
                                ])
                            )
                        )
                      )
                  )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title('Guides')
        .child(
          S.list()
            .title('Guides by Category')
            .items(
              GUIDE_CATEGORIES.map((cat) =>
                S.listItem()
                  .title(cat.title)
                  .child(
                    S.documentList()
                      .title(cat.title)
                      .filter('_type == "guide" && category == $category')
                      .params({ category: cat.id })
                  )
              )
            )
        ),
      S.divider(),
      S.listItem()
        .title('All WCAG Rules')
        .child(
          S.documentList()
            .title('All WCAG Rules')
            .filter('_type == "wcagRule"')
            .defaultOrdering([{ field: 'criterionNumber', direction: 'asc' }])
        ),
      S.listItem()
        .title('All Guides')
        .child(
          S.documentList()
            .title('All Guides')
            .filter('_type == "guide"')
        ),
    ])
