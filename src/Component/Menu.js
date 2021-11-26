
import React from 'react'


export default function Menu() {
    return (
        <div className="justify-content-center m-3 ">
            <table>
                <tr  >
                    <td><a href="/"><img src="https://luxen.vn/media/images/icondm.png" width="30px" /><span className="px-2">List</span></a></td> 
                </tr>
                <tr >
                <td><a href="/New"><img src="https://cdn3.iconfinder.com/data/icons/eightyshades/512/14_Add-512.png" width="30px"/><span className="px-2">New</span></a></td>
                </tr>
               
            </table>
        </div>
    )
}
