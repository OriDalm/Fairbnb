import { useState } from 'react';
import { updateFilterBy } from '../store/stay.actions'
import { useQueryParams } from '../customHooks/useQueryParams'

import MultiRangeSlider from "multi-range-slider-react";
import { useSelector } from 'react-redux';


export function StayFilter({ toggleStayFilter, filterByToEdit, setFilterByToEdit, stays }) {

    const [selectedFilterBox, setSelectedFilterBox] = useState('any-type')
    const [selectedCapBox, setSelectedCapBox] = useState('')
    let [newFilterBy, updateParams] = useQueryParams()
    const filterBy = useSelector((storeState) => storeState.stayModule.filterBy)


    const capacity = ['', 1, 2, 3, 4, 5, 6, 7, 8]

    const [minValue, set_minValue] = useState(filterByToEdit.minPrice);
    const [maxValue, set_maxValue] = useState(filterByToEdit.maxPrice);
    const handleInput = (e) => {
        set_minValue(e.minValue)
        set_maxValue(e.maxValue)
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, minPrice: minValue, maxPrice: maxValue }))

    }



    function handleChange({ target }) {
        console.log(target.name);
        const field = target.name
        let value = target.value
        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break

            case 'checkbox':
                value = target.checked
                break

            case 'select-multiple':
                const selectedOptions = Array.from(target.selectedOptions, (option) => option.value)
                value = selectedOptions
                break

            default:
                break
        }
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))

    }

    function onSubmit(ev) {
        ev.preventDefault()
        updateFilterBy(filterByToEdit)
        newFilterBy = {...filterBy}
        updateParams(newFilterBy)
        toggleStayFilter()
    }

    function setRoomTypeCapacity(type, capacity) {
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [type]: capacity }))
        setSelectedCapBox({ ...selectedCapBox, [type]: capacity })
    }

    function onSetSelectedFilterBox(ev, name) {
        ev.preventDefault()
        setSelectedFilterBox(name)
        if (name === 'any-type') name = ''
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, roomType: name }))

    }

    function clearFilter() {
        setSelectedFilterBox('any-type')
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, bedrooms: '', bathrooms: '' }))
        set_minValue(0)
        set_maxValue(2600)
    }

    return (
        <div className='filter-container'>

            <section className="filter-modal">

                <header className="filter-modal-header">
                    <div>
                        <button onClick={toggleStayFilter}><img src='https://res.cloudinary.com/do0a92wpm/image/upload/v1699218785/close-btn_xugogt.svg' /></button>
                    </div>
                    Filters
                </header>


                <section className="filter-modal-container">
                    <div className='type-filter filter'>
                        <h3>Type of place</h3>
                        <p>Search rooms, entire homes, or any type of place.</p>
                        <div className='filter-btn-container'>
                            <button className={selectedFilterBox === 'any-type' ? 'active' : ''} name='any-type' onClick={(ev) => onSetSelectedFilterBox(ev, 'any-type')}>Any type</button>
                            <button className={selectedFilterBox === 'Private room' ? 'active' : ''} name='Private room' onClick={(ev) => onSetSelectedFilterBox(ev, 'Private room')}>Room</button>
                            <button className={selectedFilterBox === 'Entire home/apt' ? 'active' : ''} name='Entire home/apt' onClick={(ev) => onSetSelectedFilterBox(ev, 'Entire home/apt')}>Entire home</button>
                        </div>
                    </div>

                    <div className='price-filter filter'>
                        <h3>Price range</h3>
                        <p>Nightly prices including fees and taxes</p>
                        <div>
                            <MultiRangeSlider
                                thumbLeftColor={'white'}
                                thumbRightColor={'white'}
                                barLeftColor={'white'}
                                barRightColor={'white'}
                                barInnerColor={'black'}
                                ruler={false}
                                label={false}

                                // baseClassName={"border: 'none', boxShadow: 'none'"}

                                min={0}
                                max={2000}
                                step={1}
                                minValue={minValue}
                                maxValue={maxValue}
                                onInput={(e) => {
                                    handleInput(e);
                                }}
                            />
                        </div>
                        <div className='price-input-container'>

                            <div className='price-input'>
                                <div>Minimun</div>
                                <label htmlFor="minPrice">$</label>
                                <input type="number"
                                    id="minPrice"
                                    name="minPrice"
                                    placeholder="By min price"
                                    value={minValue}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className='price-input'>
                                <div>Maximum</div>
                                <label htmlFor="maxPrice">$</label>
                                <input type="number"
                                    id="maxPrice"
                                    name="maxPrice"
                                    placeholder="By max price"
                                    value={maxValue}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    <div className='capacity-filter filter'>
                        <h3>Rooms and beds</h3>
                        <div>
                            Bedrooms
                            <div className='btn-container'>
                                {capacity.map(capNum =>
                                    <button className={selectedCapBox.bedrooms === capNum ? 'active' : ''} key={capNum} onClick={() => setRoomTypeCapacity('bedrooms', capNum)}>{capNum ? capNum : 'Any'}</button>
                                )}
                            </div>
                        </div>
                        <div>
                            Bathrooms
                            <div className='btn-container'>
                                {capacity.map(capNum =>
                                    <button className={selectedCapBox.bathrooms === capNum ? 'active' : ''} key={capNum} onClick={() => setRoomTypeCapacity('bathrooms', capNum)}>{capNum ? capNum : 'Any'}</button>
                                )}
                            </div>
                        </div>

                    </div>

                </section>


                <footer className="filter-modal-footer">
                    <button onClick={() => clearFilter()}>Clear all</button>
                    <button onClick={(ev) => onSubmit(ev)}>Show places</button>
                </footer>


            </section>
            <div className="overlay" onClick={toggleStayFilter}></div>
        </div>
    )
}