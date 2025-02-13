import React from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Link, navigate } from '@reach/router'

import {
  isWefundWallet,
  isCommunityWallet,
  isBackerWallet, 
  isCreatorWallet,
  isCardHolder,
  isBackable,
  }  from '../../Util'

import { ButtonTransition } from '../../ImageTransition'
import { useStore } from '../../../store'

export default function StatusButtons({
  index,
  data,
  activeTab,
  WefundApprove,
  CommunityVote,
  MilestoneVote,
  NextFundraisingStage,
  Modify,
  OpenWhitelist,
  CloseWhitelist,
  JoinWhitelist
}) 
{
  const { state, dispatch } = useStore()
  return (
    <>
      {activeTab === 'MileStoneDelivery' && (
        <Text py={2} color={'gray.400'}>
          Project Milestone step -{' '}
          {parseInt(data.project_milestonestep) + 1}
        </Text>
      )}
      {activeTab === 'WeFundApproval' && isWefundWallet(state) && (
        <Flex justify={'center'}>
          <ButtonTransition
            unitid={'Approve' + index}
            selected={false}
            width="180px"
            height="40px"
            rounded="30px"
            onClick={() => {
              WefundApprove(data.project_id)
            }}
          >
            <Text fontSize={'15px'}>
              Approve Project
            </Text>
          </ButtonTransition>
        </Flex>
      )}
      {activeTab === 'WhistlistOpen' && isCardHolder(state, data.project_id) && (
        <Flex justify={'center'}>
          <ButtonTransition
            unitid={'Whitelist' + index}
            selected={false}
            width="180px"
            height="40px"
            rounded="30px"
            onClick={() => {
              JoinWhitelist(state, data.project_id)
            }}
          >
            <Text fontSize={'15px'}>
              Join Whitelist
            </Text>
          </ButtonTransition>
        </Flex>
      )}
      {activeTab === 'WhistlistOpen' && isCreatorWallet(state, data.project_id) && (
        <Flex justify={'center'}>
          <ButtonTransition
            unitid={'Closewhitelist' + index}
            selected={false}
            width="180px"
            height="40px"
            rounded="30px"
            onClick={() => {
              CloseWhitelist(data.project_id)
            }}
          >
            <Text fontSize={'15px'}>
              Close Whitelist
            </Text>
          </ButtonTransition>
        </Flex>
      )}
      {activeTab === 'Fundraising' && (
        <>
        <Text>{data.fundraising_stage} phase</Text>
        {isCreatorWallet(state, data.project_id) && (
        <>
          <ButtonTransition
            mb="10px"
            rounded="30px"
            selected={false}
            unitid={'next stage' + index}
            width="180px"
            height="40px"
            fontSize={{ base: '14px', lg: '16px' }}
            onClick={() => {NextFundraisingStage(data.project_id, data.fundraising_stage)}}
          >
            <Text fontSize={{ base: '14px', lg: '16px' }} >
              Next Stage
            </Text>
          </ButtonTransition>
          <ButtonTransition
            unitid={'openwhitelist' + index}
            width="180px"
            height="40px"
            selected={false}
            rounded="30px"
            mb="10px"
            onClick={() =>OpenWhitelist(data.project_id)}
          >
            <Text fontSize={'15px'}>Reopen Whitelist</Text>
          </ButtonTransition>
        </>
        )}
        {isBackable(state, data.project_id ) && (
          <ButtonTransition
            unitid={'visit' + index}
            width="180px"
            height="40px"
            selected={false}
            rounded="30px"
            mb="10px"
            onClick={() =>
              navigate(
                `/back?project_id=${data.project_id}`,
              )
            }
          >
            <Text fontSize={'15px'}>Back Project</Text>
          </ButtonTransition>
        )}
        </>
      )}
      {activeTab === 'MileStoneDelivery' && isBackerWallet(state, data.project_id) && (
        <Flex justify={'space-between'}>
          <ButtonTransition
            unitid={'milestonevoteyes' + index}
            width="120px"
            height="40px"
            selected={false}
            rounded="30px"
            onClick={() =>
              MilestoneVote(data.project_id, true)
            }
          >
            <Text fontSize={'15px'}>Vote Yes</Text>
          </ButtonTransition>

          <ButtonTransition
            unitid={'milestonevoteno' + index}
            selected={false}
            width="120px"
            height="40px"
            rounded="30px"
            onClick={() =>
              MilestoneVote(data.project_id, false)
            }
          >
            <Text fontSize={'15px'}>Vote No</Text>
          </ButtonTransition>
        </Flex>
      )}
      {isCreatorWallet(state, data.project_id) && (
        <Flex justify={'space-between'}>
          <ButtonTransition
            unitid={'Modification' + index}
            width="120px"
            height="40px"
            selected={false}
            rounded="30px"
            onClick={() =>
              Modify(data.project_id)
            }
          >
            <Text fontSize={'15px'}>Modify</Text>
          </ButtonTransition>
        </Flex>
      )}
    </>
  )
};
