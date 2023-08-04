import "../../recruiting-details/recruiting-details.css"

import * as microsoftTeams from "@microsoft/teams-js";

import {
    AddIcon,
    Button,
    CallControlStopPresentingNewIcon,
    Card,
    EditIcon,
    Flex,
    Header,
    Loader,
    MoreIcon,
    Text,
    Tooltip
} from '@fluentui/react-northstar'
import { deleteQuestion as deleteQuestionDetails, editQuestion, getQuestions, saveQuestions } from "../services/recruiting-detail.service";

import { IQuestionSet } from "./basic-details.types";
import React from "react";

const Questions = (): React.ReactElement => {
    // The questions array set for a meeting.
    const [questionDetails, setQuestionDetails] = React.useState<any[]>([]);
    const [ratingsArray, setRatingsArray] = React.useState<any[]>([]);
    const [showLoader, setShowLoader] = React.useState<boolean>(false);

    // Method to start task module to add questions.
    const addQuestionsTaskModule = () => {
        let taskInfo = {
            title: "Questions",
            size: {
                height: 300,
                width: 400
            },
            url: `${window.location.origin}/questions`,
        };

        microsoftTeams.dialog.url.open(taskInfo, (res) => {
            if (res.err) {
                console.log("Some error occurred in the task module")
                return
            }

            const questionsObject = JSON.parse(res.result);
            microsoftTeams.app.getContext().then((context) => {
                const questDetails: IQuestionSet[] = questionsObject.map((question: any) => {
                    if (question.checked) {
                        // The question details to save.
                        return {
                            meetingId: context.meeting!.id,
                            question: question.value,
                            setBy: context.user.userPrincipalName!,
                            isDelete: 0
                        };
                    }
                })

                // API call to save the question to storage.
                saveQuestions(questDetails)
                    .then((res) => {
                        loadQuestions()
                    })
                    .catch((ex) => {
                        console.log("Error while saving question details" + ex)
                    });
            })
        });
    };

    // Method to start task module to edit a question.
    const editQuestionsTaskModule = (editText: string, rowKey: any) => {
        let taskInfo = {
            title: "Questions",
            size: {
                height: 300,
                width: 400
            },
            url: `${window.location.origin}/edit?editText=` + editText,
        };

        microsoftTeams.dialog.url.open(taskInfo, (res) => {
            if (res.err) {
                console.log("Some error occurred in the task module")
                return
            }
            microsoftTeams.app.getContext().then((context) => {
                const questDetails: IQuestionSet = {
                    meetingId: context.meeting!.id,
                    question: question,
                    setBy: context.user.userPrincipalName!,
                    isDelete: 0,
                    questionId: rowKey
                };
                setShowLoader(true);
                // API call to save the question to storage.
                editQuestion(questDetails)
                    .then((res) => {
                        loadQuestions();
                        setShowLoader(false);
                    })
                    .catch((ex) => {
                        console.log("Error while saving question details in edit" + ex);
                        setShowLoader(false);
                    });
            })
        });
    };

    // Method to load the questions in the question container.
    const loadQuestions = () => {
        microsoftTeams.app.getContext().then((context) => {
            getQuestions(context.meeting!.id)
                .then((res) => {
                    console.log(res)
                    const questions = res.data as any[];
                    setQuestionDetails(questions)
                })
                .catch((ex) => {
                    console.log("Error while getting the question details" + ex)
                });
        });
    }

    const deleteQuestion = (questionDetail: any) => {
        const questionDetails: IQuestionSet = {
            meetingId: questionDetail.meetingId,
            question: questionDetail.question,
            questionId: questionDetail.rowKey,
            setBy: questionDetail.setBy,
            isDelete: 1
        }
        setShowLoader(true);
        // API call to save the question to storage.
        deleteQuestionDetails(questionDetails)
            .then((res) => {
                loadQuestions();
                setShowLoader(false);
            })
            .catch((ex) => {
                console.log("Error while deleting question details" + ex);
                setShowLoader(false);
            });
    }

    React.useEffect((): any => {
        const prevItems = [];
        for (var i = 1; i <= 5; i++) {
            prevItems.push(
                <Button size="small" circular content={i} />
            )
        }

        // Setting ratings to show in the UI.
        setRatingsArray(prevItems);

        microsoftTeams.app.initialize();
        loadQuestions();
    }, [])

    return (
        <>
            <Loader hidden={!showLoader} />
            <Flex column gap="gap.smaller">
                <Flex gap="gap.smaller">
                    <Header as="h4" content="Questions" className="questionsHeader" />
                    <AddIcon onClick={() => addQuestionsTaskModule()} title="Add new questions" />
                </Flex>
                <Text content="Questions added here will appear in meeting with candidate and can help you rate at the point of time" />
                <Flex gap="gap.smaller" column className="questionWrapper">
                    {
                        questionDetails.map((questionDetail, index) => {
                            return (
                                <>
                                    <Card key={index} fluid aria-roledescription="card with question details" className="questionsCard">
                                        <Card.Body>
                                            <Flex gap="gap.smaller" column>
                                                <Flex gap="gap.smaller" space="between">
                                                    <Text content={questionDetail.question} />
                                                    <Tooltip
                                                        trigger={<MoreIcon />}
                                                        content={
                                                            <Flex column gap="gap.smaller">
                                                                <Flex >
                                                                    <Button icon={<EditIcon />} text content="Edit" className="editIcon"
                                                                        onClick={() => editQuestionsTaskModule(questionDetail.question, questionDetail.rowKey)} />
                                                                </Flex>
                                                                <Flex>
                                                                    <Button icon={<CallControlStopPresentingNewIcon />} text content="Delete" onClick={() => deleteQuestion(questionDetail)} />
                                                                </Flex>
                                                            </Flex>
                                                        }
                                                        position="below"
                                                    />
                                                </Flex>
                                                <Flex gap="gap.small">
                                                    {ratingsArray}
                                                </Flex>
                                            </Flex>
                                        </Card.Body>
                                    </Card>
                                </>
                            )
                        })
                    }
                </Flex>
            </Flex>
        </>
    )
}

export default (Questions);