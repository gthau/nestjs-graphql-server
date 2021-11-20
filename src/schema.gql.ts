
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

export interface AssetResponse {
    __typename?: 'AssetResponse';
    asset?: Nullable<Asset>;
}

export interface AssetError {
    __typename?: 'AssetError';
    error: string;
}

export interface AssetNotFound {
    __typename?: 'AssetNotFound';
    symbol: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    asset(input: AssetInput): AssetResult | Promise<AssetResult>;
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
export type AssetResult = AssetResponse | AssetNotFound | AssetError;
type Nullable<T> = T | null;
