"use client";

import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textInput";
import { Button } from "@repo/ui/button";
import { useState } from "react";
import { transfer } from "../app/lib/p2pAction";

const p2pCard = () => {
  const [toemail, setEmail] = useState("");
  const [amount, setAmount] = useState(0);

  return (
    <div className=" w-full flex p-4">
      <Card title="Send Money from Your Wallet">
        <TextInput
          label="email"
          placeholder="akshat@gmail.com"
          onChange={(email) => setEmail(email)}
        />

        <TextInput
          label="Amount"
          placeholder=""
          onChange={(amount) => setAmount(Number(amount))}
        />

        <div className=" p-3">
          <Button
            onClick={async () => {
              await transfer(toemail, amount * 100);
             window.location.reload();
            }} >
            Transfer
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default p2pCard;
