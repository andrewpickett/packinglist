import type {ChangeEvent} from "react";

import ItemCreate from "./ItemCreate.tsx";

import type {CategoryItem, ListCategory} from "../../types/list.ts";
import {noOp} from "../../utils/utils.tsx";
import {XCircleFill} from "react-bootstrap-icons";

interface CategoryCreateProps {
   category: ListCategory,
   index: number,
   categoryUpdateFunc: (e: ChangeEvent<HTMLInputElement>) => void,
   categoryDeleteFunc: (catIdx: number) => void,
   itemCreateFunc: (catIdx: number) => void,
   itemUpdateFunc: (e: ChangeEvent<HTMLInputElement>, catIdx: number) => void,
   itemDeleteFunc: (catIdx: number, itemIdx: number) => void
}

function CategoryCreate({category, index, categoryUpdateFunc, categoryDeleteFunc, itemCreateFunc, itemUpdateFunc, itemDeleteFunc}: CategoryCreateProps) {
   return (
      <div className={"container pl-category mt-4 mb-4 pt-3 pb-2 rounded"} style={{border: "1px dashed #2c9092"}} id={`category${index}row`}>
         <input type={"text"} id={`category${index}`} className={"form-control invalid pl-category-title"}
                value={category.name}
                onChange={categoryUpdateFunc} autoFocus={true} data-1p-ignore/>
         <label className={"form-label"} htmlFor={"list_name"}>Category Name</label>
         <div>
            {category.items?.map((item: CategoryItem, i) => (
               <ItemCreate item={item} key={i} placeholder={false} catId={index} itemCreateFunc={noOp}
                           itemUpdateFunc={itemUpdateFunc} itemDeleteFunc={itemDeleteFunc} />
            ))}
            <ItemCreate item={{id: -1, name: ""}} placeholder={true} catId={index} itemCreateFunc={itemCreateFunc}
                        itemUpdateFunc={noOp} />
         </div>
         <div className={"d-flex justify-content-end mt-3"}>
            <button className={"btn btn-outline-danger"} onClick={() => categoryDeleteFunc(index)}><XCircleFill /> Remove Category</button>
         </div>
      </div>
   );
}

export default CategoryCreate;
