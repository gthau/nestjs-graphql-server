
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface AssetInput {
    symbol: string;
}

export interface Asset {
    __typename?: 'Asset';
    id: string;
    name: string;
    slug: string;
    symbol: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    asset(input: AssetInput): Nullable<Asset> | Promise<Nullable<Asset>>;
    ping(): Nullable<Void> | Promise<Nullable<Void>>;
}

export interface IMutation {
    __typename?: 'IMutation';
    ping(): Nullable<Void> | Promise<Nullable<Void>>;
}

export interface ISubscription {
    __typename?: 'ISubscription';
    ping(): Nullable<Void> | Promise<Nullable<Void>>;
}

export type Void = void;
type Nullable<T> = T | null;
