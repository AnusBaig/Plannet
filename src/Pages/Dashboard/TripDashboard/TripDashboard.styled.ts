import styled from "@emotion/styled";

const MainStyled = styled.div`
width: 80%;
margin: 0 auto;
}
`

const HeadingStyled =  styled.div`
    border: 2px solid black;
    display: flex;
    justify-content: space-between;
    button {
        border: 2px solid red;
    }
`

const RSVPStyled =  styled.div`
    border: 2px solid black;
`

const FinishedStyled =  styled.div`
    border: 2px solid black;
`

const ConfiremdStyled =  styled.div`
    border: 2px solid black;
`


export {
    HeadingStyled,
    RSVPStyled,
    FinishedStyled,
    ConfiremdStyled,
    MainStyled

}