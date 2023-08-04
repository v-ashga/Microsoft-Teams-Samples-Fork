import "../../recruiting-details/recruiting-details.css"

import * as microsoftTeams from "@microsoft/teams-js";

import { Button, Flex, Text, TextArea } from '@fluentui/react-northstar'

import React from "react";

const EditQuestion = (props: any): React.ReactElement => {
    const [question, setQuestion] = React.useState<any>('');
    React.useEffect(() => {
        microsoftTeams.app.initialize();
        const search = props.location.search;
        const editText = new URLSearchParams(search).get('editText');
        setQuestion(editText);
    }, [])

    const saveQuestion = () => {
        microsoftTeams.dialog.url.submit(question.trim());
        return true;
    }

    return (
        <>
            {question !== '' &&
                <Flex column gap="gap.medium" padding="padding.medium">
                    <Text content="Please edit the below question" />
                    <TextArea fluid defaultValue={question} className="editTextArea"
                        onChange={(event: any) => {
                            setQuestion(event.target.value)
                        }} />
                    <Flex>
                        <Button primary content="Update" onClick={saveQuestion} />
                    </Flex>
                </Flex>
            }
        </>
    )
}

export default EditQuestion;