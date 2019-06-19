import React from 'react'
import { render } from '@testing-library/react'
import mockAxios from 'jest-mock-axios'
import { StateMock } from '@react-mock/state'
import VersionNumbers from '.'

import { User } from '../../../context'
import { userMockConnected } from '../../../../__mocks__/user-mock'

afterEach(() => {
    mockAxios.reset()
})

const stateMockIncomplete = {
    commons: {
        name: 'Commons',
        version: undefined
    },
    squid: {
        name: 'Squid-js',
        version: undefined
    },
    aquarius: {
        name: 'Aquarius',
        version: undefined
    },
    brizo: {
        name: 'Brizo',
        version: undefined,
        contracts: undefined,
        network: undefined,
        keeperVersion: undefined,
        keeperUrl: undefined
    },
    faucet: {
        name: 'Faucet',
        version: undefined
    },
    status: {
        ok: false,
        network: false,
        contracts: false
    }
}

const mockResponse = {
    data: {
        software: 'Faucet',
        version: '6.6.6'
    }
}

const mockResponseFaulty = {
    status: 404,
    statusText: 'Not Found',
    data: {}
}

describe('VersionNumbers', () => {
    it('renders without crashing', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <VersionNumbers />
            </User.Provider>
        )
        mockAxios.mockResponse(mockResponse)
        expect(mockAxios.get).toHaveBeenCalled()
        expect(container.firstChild).toBeInTheDocument()
    })

    it('renders without proper component response', () => {
        const { container } = render(
            <User.Provider value={userMockConnected}>
                <StateMock state={stateMockIncomplete}>
                    <VersionNumbers />
                </StateMock>
            </User.Provider>
        )
        mockAxios.mockResponse(mockResponseFaulty)
        expect(mockAxios.get).toHaveBeenCalled()
        expect(container.querySelector('table')).toHaveTextContent(
            'Could not get version'
        )
    })
})
