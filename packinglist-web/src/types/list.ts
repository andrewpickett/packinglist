export interface PackingList {
   id: number | -1,
   name: string,
   categories: ListCategory[]
}

export interface ListCategory {
   id: number | -1,
   name: string,
   items?: CategoryItem[]
}

export interface CategoryItem {
   id: number | -1,
   name: string
}
