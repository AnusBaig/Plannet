import React, { useRef } from 'react'
import { useDrag, useDrop, DropTargetMonitor } from 'react-dnd'
import { XYCoord } from 'dnd-core'
import RectanguleShadow from 'src/Components/RectanguleShadow'
import { IndexStyled, CityNameStyled } from './Step11.styled'
import { ReactComponent as HamburgerIcon } from "src/shared/assets/hamburger.svg";
import { ReactComponent as CancelIcon } from "src/shared/assets/cancel.svg";
import { RectanguleStyled } from 'src/Components/RectanguleShadow/RectanguleShadow.styled'
import { colors } from 'src/shared/styles/colors'

export interface DragItemProps {
    id: any;
    value: any;
    index: number;
    groupName: string;
    moveCity: (dragIndex: number, hoverIndex: number) => void;
    onRemoveCity: (value: any) => void;
}

interface DragItem {
    index: number
    id: string
    type: string
}
const DragItem: React.FC<DragItemProps> = ({ id, value, index, moveCity, groupName, onRemoveCity }) => {
    const ref = useRef<HTMLDivElement>(null)
    const [, drop] = useDrop({
        accept: groupName,
        hover(item: DragItem, monitor: DropTargetMonitor) {
            if (!ref.current) {
                return
            }
            const dragIndex = item.index
            const hoverIndex = index

            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }

            // Determine rectangle on screen
            const hoverBoundingRect = ref.current!.getBoundingClientRect()

            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

            // Determine mouse position
            const clientOffset = monitor.getClientOffset()

            // Get pixels to the top
            const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top

            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%

            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }

            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }

            // Time to actually perform the action
            moveCity(dragIndex, hoverIndex)

            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            item.index = hoverIndex
        },
    })

    const [{ isDragging }, drag] = useDrag({
        item: { type: groupName, id, index },
        collect: (monitor: any) => ({
            isDragging: monitor.isDragging(),
        }),
    })

    drag(drop(ref))
    return (
        <RectanguleStyled
            ref={ref}
            style={{ cursor: 'move', backgroundColor: isDragging ? colors.paleGrey2 : colors.white }}
            column={false}
            width="100%"
        >
            <HamburgerIcon />

            <IndexStyled>{index + 1}</IndexStyled>
            <CityNameStyled>
                {value.location}
                <CancelIcon onClick={() => onRemoveCity(value)} />
            </CityNameStyled>
        </RectanguleStyled>
    );
}

export default DragItem
