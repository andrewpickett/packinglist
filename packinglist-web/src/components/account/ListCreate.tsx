import {type ChangeEvent, type FormEvent, useState} from "react";
import {ListCheck, Plus} from "react-bootstrap-icons";
import axios from "axios";

import BackButton from "../home/BackButton.tsx";
import CategoryCreate from "./CategoryCreate.tsx";

import type {CategoryItem, ListCategory, PackingList} from "../../types/list.ts";
import UnsavedModal from "./UnsavedModal.tsx";

interface ListCreateProps {
   list?: {id: number | -1, name: string, categories: ListCategory[] }
}

function ListCreate({list}: ListCreateProps) {
   const [newList, setNewList] = useState<PackingList>(list == null ? {id: -1, name: "", categories: []} : list);
   const [showModal, setShowModal] = useState<boolean>(false);

   const getNextId = (ids: number[] | undefined) => {
      let newIds = ids && ids.length > 0 ? ids : [0];
      return Math.max(...newIds) + 1
   }

   const handleCreateCategoryClick = () => {
      let newCategory: ListCategory = {id: getNextId(newList.categories?.map((cat) => cat.id)), name: "", items: undefined};
      setNewList(prevData => ({
         ...prevData,
         categories: [...prevData.categories, newCategory]
      }));
   };

   const handleCreateItemClick = (catIdx: number) => {
      setNewList(prevData => ({
         ...prevData,
         categories: prevData.categories.map((category) => {
            if (category.id === catIdx) {
               let newItem: CategoryItem = {id: getNextId(category.items?.map((item) => item.id)), name: ""}
               let newItems = category.items ? category.items : [];
               return {...category, items: [...newItems, newItem]}
            }
            return category;
         })
      }));
   };

   const handleCategoryUpdate = (e: ChangeEvent<HTMLInputElement>) => {
      setNewList(prevData => ({
         ...prevData,
         categories: prevData.categories.map((category) =>
            e.target.id === `category${category.id}` ? {...category, name: e.target.value} : category
         )
      }));
   };

   const handleCategoryDelete = (catIdx: number) => {
      setNewList(prevData => ({
         ...prevData,
         categories: prevData.categories.filter((category) => category.id !== catIdx)
      }));
   };

   const handleItemUpdate = (e: ChangeEvent<HTMLInputElement>, catIdx: number) => {
      setNewList(prevData => ({
         ...prevData,
         categories: prevData.categories.map((category) => {
            if (category.id === catIdx) {
               let newItems = category.items?.map((item) => {
                  if (e.target.id === `category${catIdx}item${item.id}`) {
                     return {...item, name: e.target.value};
                  }
                  return item;
               });
               return {...category, items: [...(newItems ? newItems : [])]};
            }
            return category;
         })
      }));
   };

   const handleItemDelete = (catIdx: number, itemIdx: number) => {
      setNewList(prevData => ({
         ...prevData,
         categories: prevData.categories.map((category) => {
            if (category.id === catIdx) {
               let newItems = category.items?.filter((item) => item.id !== itemIdx);
               return {...category, items: [...(newItems ? newItems : [])]};
            }
            return category;
         })
      }));
   };

   const handleCreateListSubmit = (e: FormEvent) => {
      e.preventDefault();
      e.stopPropagation();

      try {
         let url = "/lists/" + (newList.id == -1 ? "" : newList.id + "/");
         let meth = (newList.id == -1 ? axios.post : axios.put);
         meth(url, newList)
            .then(response => {
               if (response.status == 200) {
                  window.location.href = "/home";
               } else {
                  throw new Error("There was a problem creating the new list.");
               }
            }).catch(err => {
            window.alert("ERROR: " + err);
         });
      } catch (err: any) {
         window.alert("ERROR2: " + err);
         return;
      }
   };

   return (
      <div className={"container"}>
         <BackButton onclick={() => setShowModal(true)} />
         <form onSubmit={handleCreateListSubmit} className={"needs-validation"}>
            <input type={"hidden"} value={newList.id} />
            <div className={"form-outline mb-4"}>
               <input type={"text"} id={"list_name"} className={"form-control invalid pl-list-title"}
                      value={newList.name}
                      onChange={(e) => setNewList({...newList, name: e.target.value})} autoFocus={true} data-1p-ignore/>
               <label className={"form-label"} htmlFor={"list_name"}>List Name</label>
            </div>
            {newList.categories.map((category, index) => (
               <CategoryCreate category={category} index={category.id} key={index} categoryUpdateFunc={handleCategoryUpdate} categoryDeleteFunc={handleCategoryDelete}
                               itemCreateFunc={handleCreateItemClick} itemUpdateFunc={handleItemUpdate} itemDeleteFunc={handleItemDelete} />
            ))}
            <div className={""}>
               <button type={"button"} className={"btn btn-success"} onClick={handleCreateCategoryClick}><Plus/> Add
                  Category
               </button>
            </div>
            <div className={"d-flex justify-content-between pt-5 mt-5"}>
               <button type={"submit"} className={"btn btn-primary"}><ListCheck/> {list == null ? "Create" : "Update"}
               </button>
            </div>
         </form>
         <UnsavedModal show={showModal} closeFunc={() => setShowModal(false)} />
      </div>
   )
}

export default ListCreate;
