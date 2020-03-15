import React, { useState } from "react";
import { ReactComponent as InfoIcon } from "src/shared/assets/info.svg";
import { ReactComponent as D1 } from "src/shared/assets/d-1.svg";
import {
    DashboardOverViewContainer,
    DashboardTextRectangle,
    TextDiv,
    DetailDiv,
    BudgetDiv,
    OverViewContentWraper,
    InnerDiv1,
    InnerDiv2,
    DetailDivText,
    StrongText,
    LinkText,
    DetailDivSmallText,
    BudgetTextDiv1,
    BudgetTextDiv2,
    BudgetValueDiv,
    BudgetValue,
    SpentValue,
    RemaningValue,
    SignSpan,
    BudgetSmallTextSpan,
    DetailInnerDiv,
    D1Div,
} from "../Dashboard.styled";
import Separator from "src/Components/Separator";
import OverviewChatBox from "src/Components/OverviewChatBox";
import { useDashboardOverview } from "src/Providers/DashboardOverview";
import { getDatesDiffInAllUnits, formatNumberAsCurrency } from 'src/shared/utils/misc'
import ProgressBar from "src/Components/ProgressBar/ProgressBar.component";

const OverviewComponent = ({ id }: { id?: string }) => {
    const { state: { dashboardOverview }, getDashboardData } = useDashboardOverview();
    const [overViewDetail, setOverViewDetail] = useState(false)
    console.log('ididid', id)
    return (
        <>
            <DashboardOverViewContainer style={{
                minHeight: overViewDetail ? '774px' : "auto"
            }}>
                <DashboardTextRectangle>
                    <TextDiv style={{
                        display: "inline-block"
                    }}>Overview</TextDiv>
                    <D1
                        onClick={() => setOverViewDetail(!overViewDetail)}
                        style={{
                            float: "right",
                            transform: overViewDetail ? "rotate(270deg)" : "rotate(0deg)",
                            margin: "20px",
                            transition: "0.6s",
                        }} />
                </DashboardTextRectangle>
                {overViewDetail ?
                    <>
                        <Separator width="30px" />
                        <Separator width="30px" />
                        <OverViewContentWraper>
                            <InnerDiv1>
                                {dashboardOverview && <DetailDiv>
                                    <DetailInnerDiv>
                                        <DetailDivText>
                                            You are currently in the{" "} <StrongText>{getDashboardData('phase')}</StrongText> phase.
                                    <br />
                                            There are{" "}
                                            <LinkText>
                                                {getDatesDiffInAllUnits(getDashboardData('nextPhaseStartDate'))}
                                            </LinkText>{" "}
                                            until the{" "}
                                            <StrongText>{getDashboardData('nextPhase')}</StrongText>{" "}
                                            phase!
                                </DetailDivText>
                                        <Separator width="30px" />

                                        <DetailDivSmallText>
                                            <InfoIcon height="10px" width="10px" /> Once
                                            a phase is over, you cannot return etc. etc.
                                            etc.
                                </DetailDivSmallText>
                                        <Separator width="79px" />

                                        <ProgressBar getDashboardData={getDashboardData} />

                                    </DetailInnerDiv>
                                </DetailDiv>}

                                <BudgetDiv>
                                    <DetailInnerDiv>
                                        <BudgetTextDiv1>Budget</BudgetTextDiv1>
                                        <BudgetTextDiv2>Update Budget</BudgetTextDiv2>
                                        <Separator width="55px" />
                                        <BudgetValueDiv>
                                            <BudgetValue>${formatNumberAsCurrency(getDashboardData('budget', 0))}</BudgetValue>
                                            <SignSpan>+</SignSpan>
                                            <SpentValue>${formatNumberAsCurrency(getDashboardData('amountSpent', 0))}</SpentValue>
                                            <SignSpan>=</SignSpan>
                                            <RemaningValue>${formatNumberAsCurrency(getDashboardData('budget', 0) - getDashboardData('amountSpent', 0))}</RemaningValue>
                                            <br />
                                            <BudgetSmallTextSpan>
                                                BUDGET
                                    </BudgetSmallTextSpan>
                                            <SignSpan></SignSpan>
                                            <BudgetSmallTextSpan>
                                                SPENT
                                    </BudgetSmallTextSpan>
                                            <SignSpan></SignSpan>
                                            <BudgetSmallTextSpan>
                                                REMAINING
                                    </BudgetSmallTextSpan>
                                        </BudgetValueDiv>
                                        <D1Div>
                                            <D1 height="32px" width="32px" />
                                        </D1Div>
                                    </DetailInnerDiv>
                                </BudgetDiv>
                            </InnerDiv1>
                            <InnerDiv2>
                                {dashboardOverview && (
                                    <OverviewChatBox
                                        messagesCluster={
                                            (dashboardOverview &&
                                                dashboardOverview.summaryChatCluster) ||
                                            []
                                        }
                                        tripID={id ? id : "1"}
                                        branchName="summary"
                                        style={{ height: "100%" }}
                                    />
                                )}
                            </InnerDiv2>
                            <Separator width="30px" />
                        </OverViewContentWraper>
                    </>
                    : null}

            </DashboardOverViewContainer>
        </>
    );
};
export default OverviewComponent;