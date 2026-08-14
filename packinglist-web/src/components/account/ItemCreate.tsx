import {type ChangeEvent, type FocusEvent, useEffect} from "react";

import type {CategoryItem} from "../../types/list.ts";
import {XCircleFill} from "react-bootstrap-icons";
import {noOp} from "../../utils/utils.tsx";

interface ItemCreateProps {
   item: CategoryItem,
   catId: number,
   placeholder: boolean,
   itemCreateFunc: (catIdx: number) => void,
   itemUpdateFunc: (e: ChangeEvent<HTMLInputElement>, catIdx: number) => void,
   itemDeleteFunc?: (catIdx: number, itemIdx: number) => void
}

function ItemCreate({item, catId, placeholder, itemCreateFunc, itemUpdateFunc, itemDeleteFunc}: ItemCreateProps) {

   useEffect(() => {
      if (!placeholder) {
         document.getElementById(`category${catId}item${item.id}`)?.focus();
      }
   }, []);

   const createFunc = (e: FocusEvent<HTMLInputElement>) => {
      if (placeholder) {
         itemCreateFunc(catId);
         e.target.blur();
      }
   }
   const updateFunc = (e: ChangeEvent<HTMLInputElement>) => {
      if (!placeholder) {
         itemUpdateFunc(e, catId);
      }
   }

   let deleteStyle = itemDeleteFunc ? {} : {display: "none"}
   return (
      <div className={"container pl-category rounded row"} id={`category${catId}item${item.id}row`}>
         <div className={"col-auto align-center align-right"}>
            <input type={"checkbox"} readOnly={true} disabled={true} className={"readonly"}/>
         </div>
         <div className={"col-8"}>
            <input type={"text"} id={`category${catId}item${item.id}`}
                   className={"col-11 form-control invalid pl-category-title"} value={item.name}
                   onChange={updateFunc} onFocus={createFunc} data-1p-ignore
                   placeholder={placeholder ? "Add Item" : ""}/>
         </div>
         <div className={"col-1 align-left m-0 p-0"}>
            <button id={`category${catId}item${item.id}btn`} type="button" className={"btn m-0 p-0"} style={deleteStyle} onClick={itemDeleteFunc ? () => itemDeleteFunc(catId, item.id) : noOp}><XCircleFill color={"#dc3545"}/></button>
         </div>
      </div>
   );
}

export default ItemCreate;
