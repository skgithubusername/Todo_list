import React, { useEffect, useState } from 'react';
import "./style.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'



const getLocalData = () => {
    const list = localStorage.getItem('myTodoList')

    if (list) {
        return JSON.parse(list);
    } else {
        return []
    }
};


function Todo() {

    const [inputdata, setInputdata] = useState("")
    const [item, setItem] = useState((getLocalData()))
    const [iseditItem, setIseditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)

    // add item function

    const addItems = () => {
        if (!inputdata) {
            alert("Please enter a valid input.");
        }

        else if (inputdata && toggleButton) {
            setItem(
                item.map((currElem) => {
                    if (currElem.id === iseditItem) {
                        return { ...currElem, name: inputdata }
                    }
                    return currElem;
                })
            );
            setInputdata("")
            setIseditItem(null)
            setToggleButton(false)

        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            };
            setItem([...item, myNewInputData]);
            setInputdata('');
        }
    };


    // edit the item 

    const editItem = (index) => {
        const item_todo_edit = item.find((currElem) => {
            return currElem.id === index
        });
        setInputdata(item_todo_edit.name)
        setIseditItem(index)
        setToggleButton(true)

    }

    // delete function

    const deleteItem = (index) => {
        const updateItem = item.filter((currElem) => {
            return currElem.id !== index;
        });
        setItem(updateItem)
    }
    //  removeAll function
    const removeAll = () => {
        setItem([]);
    }

    // adding data in local storage
    useEffect(() => {
        localStorage.setItem('myTodoList', JSON.stringify(item))
    }, [item])

    return (
        <>
            <div className='main-div'>
                <div className='child-div'>
                    {/* <figure>
                        <img src='./images/list.png' alt='error' />
                        <figcaption> Add Your List Here ✌️ </figcaption>
                        window + . = emojy
                    </figure> */}
                    <div>
                        <h1>Add Your List Here ✌️</h1>
                    </div>
                    <div className='addItems'>
                        <input type='text' className='form-control' placeholder=' ✍️ Add Item' value={inputdata} onChange={(e) => setInputdata(e.target.value)} />
                        {toggleButton ? (
                            <FontAwesomeIcon icon={faEdit}  className='fa fa-edit' onClick={addItems} />
                        ) : (<FontAwesomeIcon icon={faPlus} className='fa fa-plus'onClick={addItems} />
                        )}

                    </div>
                    {/* show all item*/}
                    <div className='showItems'>
                        {item.map((currElem) => {
                            return (
                                <div className='eachItem' key={currElem.id}>
                                    <h2>{currElem.name}</h2>
                                    <div className='todo-btn'>
                                        <FontAwesomeIcon icon={faEdit}  onClick={() => editItem(currElem.id)} />
                                        <FontAwesomeIcon icon={faTrash} onClick={() => deleteItem(currElem.id)} />
                                    </div>

                                </div>
                            )
                        })}

                    </div>
                    {/* remove all button */}
                    <div className='showItems'>
                        <button className='btn effect04' data-sm-link-text="Remove All" onClick={removeAll}><span>CHECK LIST</span></button>

                    </div>

                </div>
            </div>
        </>
    )
}

export default Todo;


