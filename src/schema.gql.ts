
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

export interface AssetsInput {
    symbols: string[];
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

export interface AssetsResponse {
    __typename?: 'AssetsResponse';
    assets?: Nullable<Asset[]>;
    notFound?: Nullable<AssetNotFound[]>;
}

export interface GraphqlError {
    __typename?: 'GraphqlError';
    error: string;
}

export interface IQuery {
    __typename?: 'IQuery';
    asset(input: AssetInput): AssetResult | Promise<AssetResult>;
    assets(input: AssetsInput): AssetsResult | Promise<AssetsResult>;
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
export type AssetsResult = AssetsResponse | GraphqlError;
type Nullable<T> = T | null;
