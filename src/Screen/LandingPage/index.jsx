import React from 'react'

// Components
import { SRow, SCol } from '../../ant_storybook/src/Components/Grid'

class LandingPage extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <SRow>
                <SCol span={12}>
                    <p>Welcome</p>
                </SCol>
                <SCol span={12}>
                    <p>Welcome</p>
                </SCol>
            </SRow>

        )
    }
}
export default LandingPage