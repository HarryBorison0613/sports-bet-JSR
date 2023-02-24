import { Fragment } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { CaretDownIcon } from 'src/icons/caret-down'
import Image from '@app/image'
import cx from 'classnames'
import { CheckIcon } from 'src/icons/check'

export interface ITeamLeagueStatContentSwitcherOption {
  id: string
  label: string
  icon?: string
}

export interface ITeamLeagueStatContentSwitcherProps {
  options: ITeamLeagueStatContentSwitcherOption[]
  selected: ITeamLeagueStatContentSwitcherOption
  onChange: (option: ITeamLeagueStatContentSwitcherOption) => any
}

const TeamLeagueStatContentSwitcher: React.FC<
  ITeamLeagueStatContentSwitcherProps
> = ({ options, selected, onChange }) => {
  return (
    <div>
      <Listbox value={selected} onChange={onChange}>
        <div className="relative mt-1">
          <Listbox.Button
            as="div"
            className="cursor-pointer relative w-full rounded-lg bg-white py-2 pl-3 pr-10 text-left border shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
          >
            <div className="flex items-center gap-2">
              {selected?.icon && (
                <Image
                  src={selected?.icon}
                  alt={selected?.label}
                  width={24}
                  height={24}
                />
              )}

              <span className="block truncate">{selected?.label}</span>
            </div>

            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <CaretDownIcon
                className="h-4 aspect-square text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {options.map((option, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    cx(
                      `z-10 relative select-none py-3 px-2 cursor-pointer border-b last-of-type:border-b-0`,
                      'pl-10 bg-white',
                      {
                        'bg-blue-100 text-primary-500': active,
                      }
                    )
                  }
                  value={option}
                >
                  {({ selected }) => (
                    <div className="flex items-center gap-2 ">
                      {option?.icon && (
                        <Image
                          src={option?.icon}
                          alt={option?.label}
                          width={24}
                          height={24}
                        />
                      )}

                      <span
                        className={cx('block truncate font-normal', {
                          'font-normal': selected,
                        })}
                      >
                        {option.label}
                      </span>

                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-primary-400">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default TeamLeagueStatContentSwitcher
