import { Fragment, useState } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function UiSelect({ data, setDetails, name, details }) {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  console.log(selected)
  const people = [
    'Wade Cooper',
    'Arlene McCoy',
    'Devon Webb',
    'Tom Cook',
    'Tanya Fox',
    'Hellen Schmidt',
  ]
  // const filteredData =
  //   query === ''
  //     ? data
  //     : data.filter((current) =>
  //       current.name
  //         .toLowerCase()
  //         .replace(/\s+/g, '')
  //         .includes(query.toLowerCase().replace(/\s+/g, ''))
  //     );

  const filteredData =
    query === ''
      ? people
      : people.filter((person) => {
          return person.toLowerCase().includes(query.toLowerCase())
        })

  const returnValue = (val) => {
    const valsToReturnId = [
      'fleet_group_id',
      'fleet_type_id',
      'fleet_organisation_id',
      'department_id',
      'designation_id',
      'state_id',
      'local_government_area_id',
      'maintenance_type_id',
      'fleet_id',
      'fleet_owner_id',
      'bank_id',
      'city_id',
      'mechanic_category_id',
      'lga_id',
      'part_id',
      'fleet_company_id',
    ];

    if (
      name === valsToReturnId[0] ||
      name === valsToReturnId[1] ||
      name === valsToReturnId[2] ||
      name === valsToReturnId[3] ||
      name === valsToReturnId[4] ||
      name === valsToReturnId[5] ||
      name === valsToReturnId[6] ||
      name === valsToReturnId[7] ||
      name === valsToReturnId[8] ||
      name === valsToReturnId[9] ||
      name === valsToReturnId[10] ||
      name === valsToReturnId[11] ||
      name === valsToReturnId[12] ||
      name === valsToReturnId[13] ||
      name === valsToReturnId[14] ||
      name === valsToReturnId[15]
    ) {
      console.log(val.id);
      return String(val.id);
    } else {
      return val.name;
    }
  };

  return (
    <div className="">
      <Combobox
        value={selected}
        onChange={(val) => {
          setSelected(val);
          console.log(name);
          if (name !== 'bank_name') {
            setDetails({ ...details, [name]: returnValue(val) });
          } else {
            console.log(true);
            setDetails({
              ...details,
              [name]: returnValue(val),
              bank_id: val.id,
            });
          }
        }}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left border focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full outline-none border-none py-2 pl-3 pr-10 text-sm leading-5 text-gray-900 focus:ring-0"
              displayValue={(current) => current}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400 hover:text-gray-500"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredData?.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredData?.map((current, index) => (
                  <Combobox.Option
                    key={current.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-[#044b55] text-white' : 'text-gray-900'
                      }`
                    }
                    value={current}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                            }`}
                        >
                          {current}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? 'text-white' : 'text-teal-600'
                              }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

export default UiSelect;
