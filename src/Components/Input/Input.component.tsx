import React, { useCallback } from "react";
import {
  InputWrapperStyled,
  InputStyled,
  InputStyledWithoutBorder,
  InputAutocompleteStyledWithoutBorder,
  InputAutocompleteStyled,
  LabelStyled,
  ErrorMessage
} from "./Input.styled";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: JSX.Element;
  type?:
  | "email"
  | "phone"
  | "number"
  | "text"
  | "password"
  | "autocompleteCities";
  width?: string;
  error?: boolean;
  label?: string;
  validation?: boolean | undefined;
  errorText?: string | undefined;
  withoutBorder?: boolean | undefined
}

const Input: React.FC<InputProps> = (
  { type = "text", ...props },
  ref: React.Ref<HTMLInputElement>
) => {

  const Icon = props.icon;

  const onPlaceSelected = useCallback(
    (place: any) => {
      if (!props.onChange) return;
      // if (place.  postal_code_prefix) {
      var addres = place.address_components
      if (addres && addres.length) {
        var value = ""
        if (addres[addres.length - 1].types[0] === "postal_code" || addres[addres.length - 1].types[0] === "postal_code_prefix") {
          value = `${addres[0].long_name}, ${addres[addres.length - 2].short_name}`
        } else {
          value = `${addres[0].long_name}, ${addres[addres.length - 1].short_name}`
        }
        const onChange = props.onChange as any;
        onChange({ target: { value }, isSelected: true });
      }
    },
    [props.onChange]
  );

  return (
    <InputWrapperStyled>
      {type !== "autocompleteCities" && (
        <>
          {
            //@ts-ignore
            props.withoutBorder ?
              <InputStyledWithoutBorder
                type={type}
                ref={ref}
                id={props.label}
                autoCorrect="off"
                autoComplete="off"
                placeholder={''}
                spellCheck={false}
                {...props}
              /> :
              <InputStyled
                type={type}
                ref={ref}
                id={props.label}
                autoCorrect="off"
                autoComplete="off"
                placeholder={''}
                spellCheck={false}
                {...props}
              />
          }
          <LabelStyled style={{zIndex: 3}} htmlFor={props.label}>{props.label}</LabelStyled>
          
          {<ErrorMessage>{props.errorText}</ErrorMessage>}
        </>
      )}
      {type === "autocompleteCities" && (
        <>
          {
              //@ts-ignore
              props.withoutBorder ?
              
            <InputAutocompleteStyledWithoutBorder
              onPlaceSelected={onPlaceSelected}
              types={["(cities)"]}
              defaultValue={props.value || ""}
              name={props.name || Math.random()}
              placeholder={''}
              value={props.value || ""}
              id={props.label}
              aria-invalid="false"
              class="MuiInput-input-32 controls"
              autocomplete="off"
              //@ts-ignore
              onFocus={(ev:any)=>document.getElementById(props.label).setAttribute('autoComplete',"off")}
              autoComplete="off"
              style={{zIndex: 4}}
              {...props}
            // If want to restrict certain countries
            // componentRestrictions={{ country: "us" }}

            /> :
            <InputAutocompleteStyled
              onPlaceSelected={onPlaceSelected}
              types={["(cities)"]}
              defaultValue={props.value || ""}
              name={props.name || Math.random()}
              placeholder={''}
              value={props.value || ""}
              id={props.label}
              aria-invalid="false"
              class="MuiInput-input-32 controls"
              autocomplete="off"
              //@ts-ignore
              onFocus={(ev:any)=>document.getElementById(props.label).setAttribute('autoComplete',"off")}
              autoComplete="off"
              style={{zIndex: 4}}
              
              {...props}
            // If want to restrict certain countries
            // componentRestrictions={{ country: "us" }}
            />
          }
          <LabelStyled
              style={{zIndex: 3}}
          
          htmlFor={props.label}>{props.label}</LabelStyled>
          {<ErrorMessage>{props.errorText}</ErrorMessage>}          
        </>
      )}
      {Icon ? Icon : null}
    </InputWrapperStyled>
  );
};

export default React.forwardRef(Input);
