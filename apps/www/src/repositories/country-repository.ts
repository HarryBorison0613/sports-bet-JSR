import { toKebabCase } from '@corex/string-util'
import countiresListData from 'src/data/countries_short_names.json'
import normalizedCountryData from 'src/data/countries_short_names.json'
import type { ICountryInfo } from 'src/interface'
import { resolveCMS } from 'src/utils/api'
import fs from 'node:fs/promises'
import path from 'path'
import { normalizeImageFilename } from 'src/utils/string'

export class CountryRepository {
  /**
   * Temp normalize country data
   * @returns
   */
  async saveCountryData() {
    const normalizedCountryData = countiresListData?.map((x) => ({
      ...x,
      slug: toKebabCase(x?.name),
    }))

    const filepath = path.resolve(
      process.cwd(),
      'src/data/countries_shot_names_normalized.json'
    )

    return fs.writeFile(filepath, JSON.stringify(normalizedCountryData))
  }

  resolveCountry(info: ICountryInfo) {
    return {
      ...info,
      slug: toKebabCase(info?.name ?? ''),
      icon: resolveCMS(
        `/logos/countries/${normalizeImageFilename(
          info?.alpha2 ?? 'default-flag'
        )}.svg`
      ),
    }
  }

  findCountryByCode(country_code: string): ICountryInfo {
    const country = normalizedCountryData?.find(
      (x) => x.alpha3?.toLowerCase() === country_code?.toLowerCase()
    )

    return this.resolveCountry(country as any)
  }

  findCountryByName(name: string): ICountryInfo {
    const country = normalizedCountryData?.find(
      (x) => toKebabCase(x?.name) === toKebabCase(name)
    ) ?? {
      name,
    }

    return this.resolveCountry(country as any)
  }
}
