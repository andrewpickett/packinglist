function ListCategory(props: { category: any }) {
    return (
        <div className={"container mt-4"}>
            <h3 className={"text-decoration-underline"}>{props.category.name}</h3>
            <div>
                {props.category.items?.map((item: { name: string }, index: number) => (
                    <div key={index}>
                        <input type="checkbox" className={"form-check-input"} /> <span>{item.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ListCategory;