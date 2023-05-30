import React, { useEffect, useState } from "react";
import "./Converter.css";
import { Card, Form, Input, Select } from "antd";

function Converter() {
  const apiUrl = "https://api.coingecko.com/api/v3/exchange_rates";
  const defaultFirstValue = " Bitcoin";
  const defaultSecondValue = " Ether";

  const [cryptoList, setCryptoList] = useState([]);
  const [inputValue, setInputValue] = useState("0");
  const [firstSelect, setFirstSelect] = useState(defaultFirstValue);
  const [secondSelect, setSecondSelect] = useState(defaultSecondValue);
  const [result, setResult] = useState("0");

  useEffect(() => {
    fetchData();
  });
  async function fetchData() {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    const data = jsonData.rates;
    const tempArray = Object.entries(data).map((item) => {
      return {
        value: item[1].name,
        label: item[1].name,
        rate: item[1].name,
      };
    });
    setCryptoList(tempArray);
  }
  useEffect(() => {
    if (cryptoList.length == 0) return;
    const firstObj = cryptoList.find((item) => {
      return item.value === firstSelect;
    }).rate;
    const secondObj = cryptoList.find((item) => {
      return item.value === secondObj;
    }).rate;

    const resultRate = (inputValue * secondObj) / firstObj;
    setResult(resultRate.toFixed(3));
  }, [inputValue, firstSelect, secondSelect]);
  return (
    <div className="container">
      <Card className="crypto-card" title={<h1>Crypto Converter</h1>} />
      <Form>
        <Form.Item>
          <Input onChange={(event) => setInputValue(event.target.value)} />
        </Form.Item>
      </Form>
      <div className="select-box">
        <Select
          style={{ width: "160px" }}
          options={cryptoList}
          defaultValue={defaultFirstValue}
          onChange={(value) => setFirstSelect(value)}
        />
        <Select
          style={{ width: "160px" }}
          options={cryptoList}
          defaultValue={defaultSecondValue}
          onChange={(value) => setSecondSelect(value)}
        />
      </div>
      <p>
        {inputValue} {firstSelect} = {result} {secondSelect}{" "}
      </p>
    </div>
  );
}

export default Converter;
