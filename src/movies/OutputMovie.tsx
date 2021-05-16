import { shuffle } from "tstl/ranges/algorithm/modifiers";
import { Paragraph } from "../components/Paragraph";
import { ArrayUtil } from "../utils/ArrayUtil";

export function OutputMovie(props: OutputMovie.IProps): JSX.Element
{
    return <Paragraph variant="h3" title={`반복수 ${props.index + 1}`}>
        <table>
            <tr>
                <th> 처리구 번호 </th>
            </tr>
        {props.row.map(str =>
            <tr>
                <td> {str} </td>
            </tr>
        )}
        </table>
    </Paragraph>;
}

export namespace OutputMovie
{
    export interface IProps
    {
        index: number;
        row: string[];
    }
}