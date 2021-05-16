import * as material from "@material-ui/core";

export function TextInput<Nullable extends boolean = false>
    (props: TextInput.IProps<Nullable>)
{
    const value: string | null = props.getter();

    return <material.TextField {...(props as any)}
        error={props.error 
            ? props.error 
            : props.getter() !== null && props.getter()!.trim() === ""}
        defaultValue={value ? value : ""}
        onChange={event => 
        {
            const written: string = (event.target as any).value;
            const value: TextInput.Value<Nullable> = (props.nullable === true && written === "")
                ? null as TextInput.Value<Nullable>
                : written as TextInput.Value<Nullable>;

            props.setter(value);
        }} />;
}

export namespace TextInput
{
    export type IProps<Nullable extends boolean = false> = 
        Omit<material.TextFieldProps, "defaultValue"|"value"|"onChange"> &
    {
        getter: () => Value<Nullable>;
        setter: (value: Value<Nullable>) => void;
        nullable?: Nullable;
    };

    export type Value<Nullable extends boolean> = 
        Nullable extends true
            ? string | null
            : string;
}