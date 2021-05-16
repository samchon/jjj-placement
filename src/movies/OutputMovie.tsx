import React from "react";
import material from "../modules/material";
import icons from "../modules/icons";
import iconv from "iconv-lite";

import { FileSystem } from "../utils/FileSystem";
import { Paragraph } from "../components/Paragraph";

export function OutputMovie(props: OutputMovie.IProps): JSX.Element
{
    function download(): void
    {
        const content: string = props.data.map(row =>
            {
                return "index\n" 
                    + row.join("\n");
            }).join("\n\n");
    
            const buffer: Buffer = iconv.encode(content, "euc-kr");
            FileSystem.download("placement.csv", buffer);
    }

    return <React.Fragment>
        <material.Button fullWidth
                variant="contained"
                onClick={() => download()}
                startIcon={ <icons.CloudDownloadOutlined /> }>
            Download
        </material.Button>
    {props.data.map((row, index) => 
        <Paragraph variant="h3" title={`반복수 ${index + 1}`}>
            <table>
                <tr>
                    <th> 처리구 번호 </th>
                </tr>
            {row.map(str =>
                <tr>
                    <td> {str} </td>
                </tr>
            )}
            </table>
        </Paragraph>
    )}
    </React.Fragment>;
}

export namespace OutputMovie
{
    export interface IProps
    {
        data: string[][];
    }
}