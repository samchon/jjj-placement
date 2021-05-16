import React from "react";
import material from "./modules/material";
import icons from "./modules/icons";
import iconv from "iconv-lite";
import { shuffle } from "tstl/ranges/algorithm/modifiers";

import { ArrayUtil } from "./utils/ArrayUtil";
import { FileSystem } from "./utils/FileSystem";

import { OutputMovie } from "./movies/OutputMovie";
import { Paragraph } from "./components/Paragraph";
import { TextInput } from "./components/TextInput";

export function App()
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

    function download(): void
    {
        const content: string = data.map(row =>
        {
            return "index\n" 
                + row.join("\n");
        }).join("\n\n");

        const buffer: Buffer = iconv.encode(content, "euc-kr");
        FileSystem.download("placement.csv", buffer);
    }

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
        <Paragraph variant="h2" title="Output">
            <material.Button fullWidth
                    variant="contained"
                    onClick={() => download()}
                    startIcon={ <icons.CloudDownloadOutlined /> }>
                Download
            </material.Button>
            <br/><br/>
            {data.map((row, index) =>
                <OutputMovie index={index} row={row} />
            )}
        </Paragraph>
    </React.Fragment>
}