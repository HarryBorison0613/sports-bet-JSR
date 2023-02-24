import { toKebabCase } from '@corex/string-util'
import type { ICategory, ISportCategorySummary } from 'src/interface'
import { toId } from 'src/utils/api'
import { CountryRepository } from './country-repository'
import categoryPriority from 'src/data/category_priority.json'
import { partition } from 'src/utils/array'

export class CategoryRepository {
  countryRepo = new CountryRepository()

  normalizeCategory(category: ICategory): ICategory {
    const country_info = this.countryRepo.findCountryByName(category?.name)

    return {
      ...(category ?? {}),
      slug: toKebabCase(category?.name ?? ''),
      category_id: toId(category?.id)!,
      country_info,
    }
  }

  sortCategorySummaries(summaries: ISportCategorySummary[]) {
    // Partition based on predicated
    const [pass, fail] = partition(summaries, (x) =>
      categoryPriority.includes(x.category_id)
    )

    // Sort passed array based on priority array
    const sortedPassArray = pass?.sort(
      (a, b) =>
        categoryPriority.indexOf(a?.category_id) -
        categoryPriority.indexOf(b?.category_id)
    )

    // Sort failed array alphabetically
    const sortedFailedArray = fail?.sort((a, b) =>
      a?.name?.localeCompare(b?.name)
    )

    // Combine and return partitioned array
    return [...sortedPassArray, ...sortedFailedArray]
  }
}
