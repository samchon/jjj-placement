import React from "react";
import { shuffle } from "tstl/ranges/algorithm/modifiers";

import { ArrayUtil } from "./utils/ArrayUtil";

import { OutputMovie } from "./movies/OutputMovie";
import { Paragraph } from "./components/Paragraph";
import { TextInput } from "./components/TextInput";

export function Application()
{
    const [deckCount, setDeckCount] = React.useState(10);
    const [repeat, setRepeat] = React.useState(4);
    
    const data: string[][] = ArrayUtil.repeat(repeat, index =>
    {
        const row: string[] = ArrayUtil.repeat(deckCount, k => 
        {
            return `T${k+1}-${index+1}`;
        });
        shuffle(row);
        return row;
    });

    return <React.Fragment>
        <Paragraph variant="h2" title="Input">
            <TextInput fullWidth 
                    type="number"
                    label="처리구 수"
                    getter={() => deckCount.toString()}
                    setter={str => setDeckCount(Number(str))} />
            <TextInput fullWidth
                    type="number"
                    label="반복 수"
                    getter={() => repeat.toString()}
                    setter={str => setRepeat(Number(str))} />
        </Paragraph>
        <OutputMovie data={data} />
    </React.Fragment>
}