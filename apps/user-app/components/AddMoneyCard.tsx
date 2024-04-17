"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textInput";
import onRampTransactionAction from "../app/lib/onRampAction";

//array of object of bank with netbanking url
const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {

    //state for redirect banking url
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);

    const [bankProvider,setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");

    const [amount, setAmount] = useState(0);

    //preety common card component from package having only title and childrens
    return <Card title="Add Money">

    {/* card children */}
    <div className="w-full">




        {/* here we are using common text input component from package ui */}
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={(amount) => { setAmount(Number(amount)) }} />




        <div className="py-4 text-left">
            Bank
        </div>
        {/* here we are common select component from package ui */}
        {/* onSelect is a function which set the redirect url of bank for selected value*/}
        {/* we are getting the selected value from the select component by select field */}
        <Select onSelect={(selectedValue) => { setRedirectUrl(SUPPORTED_BANKS.find(bank => bank.name === selectedValue)?.redirectUrl || "");
            setProvider(SUPPORTED_BANKS.find(bank=> bank.name === selectedValue)?.name || "");
         }} 
            options={SUPPORTED_BANKS.map( bank => ({
            key: bank.name,
            value: bank.name}))} />



        {/* here we are using common button component from package ui */}
        <div className="flex justify-center pt-4">
            <Button onClick={async() => { await onRampTransactionAction(amount,bankProvider)
                window.location.href = redirectUrl || "";}}>
            Add Money
            </Button>
        </div>

    </div>

</Card>
}