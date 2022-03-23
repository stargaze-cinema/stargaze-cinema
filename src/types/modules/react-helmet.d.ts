declare module 'react-helmet' {
    interface HelmetProps {
        title?: string
        titleTemplate?: string
        base?: any
        link?: Array<any>
        meta?: Array<any>
        script?: Array<any>
        onChangeClientState?: (newState: any) => void
    }

    interface HelmetData {
        title: HelmetDatum
        base: HelmetDatum
        link: HelmetDatum
        meta: HelmetDatum
        script: HelmetDatum
    }

    interface HelmetDatum {
        toString(): string
        toComponent(): React.Component<any, any>
    }

    export class Helmet extends React.Component<HelmetProps, any> {
        static rewind(): HelmetData
    }
}
