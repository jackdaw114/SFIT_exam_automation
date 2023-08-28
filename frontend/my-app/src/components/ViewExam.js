import Header from "./Header";
import NewSheet from "./NewSheet";

export default function ViewExam(props) {

    let id = props.id
    // dummy data
    let tableData = [
        {
          "key1": "value1",
          "key2": "value2",
          "key3": "value3",
          "key4": "value4",
          "key5": "value5"
        },
        {
          "key1": "value6",
          "key2": "value7",
          "key3": "value8",
          "key4": "value9",
          "key5": "value10"
        },
        {
          "key1": "value11",
          "key2": "value12",
          "key3": "value13",
          "key4": "value14",
          "key5": "value15"
        }
    ]

    // const childToParent = (info) => {
    //     setTableData(info)
    // }
    
    return (
        <>
            <Header />
            <NewSheet tableData={tableData}/>

        </>
    )
}