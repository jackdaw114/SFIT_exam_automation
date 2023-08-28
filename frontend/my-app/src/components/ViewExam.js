import { useLocation } from "react-router";
import Header from "./Header";
import NewSheet from "./NewSheet";
import { useEffect, useState } from "react";
import axios from "axios";
import { read, utils } from "xlsx";

export default function ViewExam(props) {

  // let tableData = [
  //   {
  //     "key1": "value1",
  //     "key2": "value2",
  //     "key3": "value3",
  //     "key4": "value4",
  //     "key5": "value5"
  //   },
  //   {
  //     "key1": "value6",
  //     "key2": "value7",
  //     "key3": "value8",
  //     "key4": "value9",
  //     "key5": "value10"
  //   },
  //   {
  //     "key1": "value11",
  //     "key2": "value12",
  //     "key3": "value13",
  //     "key4": "value14",
  //     "key5": "value15"
  //   }
  // ]

  const [tableData, setTableData] = useState([{}])
  let location = useLocation();
  console.log(location.state._id)

  useEffect(() => {
    axios.post('/teacher/excelbyid', { _id: location.state._id }, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      }
    }).then(res => {
      const workbook = read(res.data.sheet, { type: 'binary' })
      const worksheet = workbook.Sheets[workbook.SheetNames[0]]
      const jsonData = utils.sheet_to_json(worksheet, {
        header: [...utils.sheet_to_json(worksheet, { header: 1 })[0]]
      });
      console.log(jsonData)
      setTableData(jsonData.slice(1))
    })

  }, [])
  let id = props.id
  // dummy data

  // const childToParent = (info) => {
  //     setTableData(info)
  // }

  return (
    <>
      <Header />
      <NewSheet tableData={tableData} />

    </>
  )
}