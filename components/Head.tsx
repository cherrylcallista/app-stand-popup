"use client"
import { Tabs, Button, Flex } from "antd"
import { Finished, OnGoing, Reset } from "./exportComponents"

function Head() {
    const items = [
        {
            key: '1',
            label: 'On Going',
            children: <OnGoing />,
        },
        {
            key: '2',
            label: 'Finished',
            children: <Finished />,
        },
        {
            key: '3',
            label: 'Reset',
            children: <Reset />,
        },
    ];
    return (
        <>
            <Flex justify="space-between">
                <Tabs defaultActiveKey="1" items={items} />
                <Button type="primary" href="/add-form" style={{ marginTop: '1rem' }}>+ Add Order</Button>
            </Flex>
        </>
    )
}

export default Head
