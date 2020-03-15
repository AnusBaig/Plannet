import React from 'react'
import {
    ProgressBar as Progress,
    OverviewProcess,
    ProgressBarProcess,
    ProgressLine
} from './ProgressBar.styled'


const ProgressBar = (props: any) => {
    let phases = ['Cities & Dates', 'Whose coming', "Transporation", 'Accommodation', 'Itinerary']

    let completedPhase = phases.indexOf(props.getDashboardData('phase'))
    const StepFunction = (value: string, index: number) => {
        for (var i = 0; i < phases.length; i++) {
            if (i < completedPhase && value === phases[i]) {
                return 'completed'
            } else if (value === props.getDashboardData('phase')) {
                return 'active'
            } else {
                return ""
            }
        }
    }
    return (
        <Progress>
            {phases.map((item, index) => {
                return (
                    <OverviewProcess key={index}>
                        <ProgressBarProcess
                            className={StepFunction(item, index)}
                        >{StepFunction(item, index) === 'completed' ? <span style={{ display: 'flex', justifyContent: 'center', position: 'relative', bottom: 3, color: 'white' }}>&#10003;</span> : null}
                        </ProgressBarProcess>
                        <p>{item}</p>
                    </OverviewProcess>
                )
            })}
            <ProgressLine />
        </Progress>
    )
}

export default ProgressBar
