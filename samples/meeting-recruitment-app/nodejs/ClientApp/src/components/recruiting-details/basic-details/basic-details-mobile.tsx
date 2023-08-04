import "../../recruiting-details/recruiting-details.css"

import * as React from 'react';
import * as microsoftTeams from "@microsoft/teams-js";

import { AddIcon, Avatar, Button, Card, Flex, Header, Label, Text } from '@fluentui/react-northstar'
import { IAssetDetails, ICandidateDetails } from './basic-details.types';
import { getCandidateDetails, shareAssets } from "../services/recruiting-detail.service"

import LinkedInLogo from '../../../images/linkedin.svg';
import TwitterLogo from '../../../images/twitter.svg';

export interface IBasicDetailsMobileProps {
    selectedIndex: number,
    downloadFile: () => void,
}

// Component for basic details about candidate
const BasicDetailsMobile = (props: IBasicDetailsMobileProps) => {
    const [candidateDetails, setCandidateDetails] = React.useState<ICandidateDetails[]>([]);
    const [skills, setSkills] = React.useState<string[]>([]);

    const openShareTaskModule = () => {
        let taskInfo = {
            title: "Share policy assets",
            size: {
                height: 400,
                width: 400,
            },
            url: `${window.location.origin}/shareAssets`,
        };

        microsoftTeams.dialog.url.open(taskInfo, (res) => {
            if (res.err) {
                console.log("Some error occurred in the task module");
                return;
            }

            var details = res.result as { checkedValues: [], note: string };
            let files: any[] = [];
            details && details!.checkedValues!.forEach((item: any) => {
                if (item.isChecked === true) {
                    files.push(item.name);
                }
            });

            if (res.result !== undefined) {
                const assetDetail: IAssetDetails = {
                    message: details.note,
                    files: files,
                };

                shareAssets(assetDetail)
                    .then((res) => {
                        console.log(res);
                    })
                    .catch((ex) => {
                        console.log("Some error occurred while sharing the assets info");
                        console.log(ex);
                    });
            }
        })
    }

    React.useEffect(() => {
        getCandidateDetails()
            .then((res) => {
                console.log(res)
                const data = res.data as ICandidateDetails[];
                setSkills(data[props.selectedIndex].Skills.split(','));
                setCandidateDetails(data);
            })
            .catch((ex) => {
                console.log(ex)
            });
    }, [])

    return (
        <Card fluid aria-roledescription="card with basic details" className="basic-details-card-mobile">
            <Card.Header>
                <Text content="Candidate Details" />
            </Card.Header>
            <Card.Body>
                <Flex gap="gap.small" padding="padding.medium" column className="basicDetails">
                    <Flex gap="gap.small">
                        <Avatar
                            image="https://fabricweb.azureedge.net/fabric-website/assets/images/avatar/large/jenny.jpg"
                            label="Copy bandwidth"
                            name="Evie yundt"
                            status="unknown"
                        />
                        <Flex column>
                            <Text content={candidateDetails[props.selectedIndex]?.CandidateName} />
                            <Text content={candidateDetails[props.selectedIndex]?.Role} size="small" className="roleText" />
                        </Flex>
                    </Flex>
                    <Flex column>
                        <Flex gap="gap.small">
                            <Text content="Experience" size="small" className="expLabel" />
                            <Text content={candidateDetails[props.selectedIndex]?.Experience} size="small" />
                        </Flex>
                        <Flex gap="gap.small">
                            <Text content="Education" size="small" />
                            <Text content={candidateDetails[props.selectedIndex]?.Education} size="small" className="education" />
                        </Flex>
                    </Flex>
                    <Flex column>
                        <Header as="h5" content="Skills" className="subHeaders" />
                        <Flex gap="gap.small">
                            {skills.map((skill, index) => {
                                return (
                                    <Label circular content={skill} className="skillLabel" />
                                )
                            })
                            }
                        </Flex>
                    </Flex>
                    <Flex column>
                        <Header as="h5" content="Links" className="subHeaders" />
                        <Flex gap="gap.small" className="linkIcons">
                            <img src={LinkedInLogo} alt="Linked in icon" onClick={() => {
                                window.open(candidateDetails[props.selectedIndex].LinkedInUrl)
                            }} />
                            <img src={TwitterLogo} alt="Twitter icon" onClick={() => {
                                window.open(candidateDetails[props.selectedIndex].TwitterUrl)
                            }} />
                        </Flex>
                        <Flex gap="gap.small">
                            <Button content={"Resume"} className="linkLabel" onClick={props.downloadFile} />
                            <Button content={"Peer feedback"} className="linkLabel" />
                        </Flex>
                    </Flex>
                    <Flex>
                        <Button
                            icon={<AddIcon />}
                            content={'Share docs'}
                            size="small"
                            className="shareDocs"
                            onClick={openShareTaskModule} />
                    </Flex>
                </Flex>
            </Card.Body>
        </Card>
    )
}
export default (BasicDetailsMobile);