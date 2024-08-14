import { ChannelConfig } from './ChannelConfig';
import { ChannelDetails, PaymentDetails, PeerDetails } from './Bindings';

import { NativeModules } from 'react-native';

export interface NativeLdkNodeRn {
  createConfig(
    storageDirPath: string,
    logDirPath: string,
    network: string,
    listeningAddress: Array<string> | null,
    defaultCltvExpiryDelta: number,
    onchainWalletSyncIntervalSecs: number,
    walletSyncIntervalSecs: number,
    feeRateCacheUpdateIntervalSecs: number,
    trustedPeers0conf: Array<string>,
    probingLiquidityLimitMultiplier: number,
    logLevel: string
  ): string;

  fromConfig(configId: string): string;
  setEntropySeedPath(buildId: string, seedPath: string): boolean;
  setEntropySeedBytes(buildId: string, seedBytes: Array<number>): boolean;
  setEntropyBip39Mnemonic(buildId: string, mnemonic: string, passphrase?: string): boolean;
  setEsploraServer(buildId: string, esploraServerUrl: string): boolean;
  setGossipSourceP2p(buildId: string): boolean;
  setGossipSourceRgs(buildId: string, rgsServerUrl: string): boolean;
  setStorageDirPath(buildId: string, storageDirPath: string): boolean;
  setNetwork(buildId: string, network: string): boolean;
  setListeningAddresses(buildId: string, listeningAddresses: Array<string>): boolean;
  build(buildId: string): string;

  start(nodeId: string): boolean;
  stop(nodeId: string): boolean;
  syncWallets(nodeId: string): boolean;
  nodeId(nodeId: string): string;
  isRunning(nodeId: string): boolean;
  listeningAddresses(nodeId: string): Array<string> | null;
  newOnchainAddress(nodeId: string): string;
  sendToOnchainAddress(nodeId: string, address: string, amountMsat: number): string;
  sendAllToOnchainAddress(nodeId: string, address: string): string;
  spendableOnchainBalanceSats(nodeId: string): number;
  totalOnchainBalanceSats(nodeId: string): number;
  connect(nodeId: string, pubKey: string, address: string, persist: boolean): boolean;
  disconnect(nodeId: string, pubKey: string): boolean;
  connectOpenChannel(
    nodeId: string,
    pubKey: string,
    address: string,
    channelAmountSats: number,
    pushToCounterpartyMsat: number,
    channelConfig: any,
    announceChannel: boolean
  ): boolean;
  closeChannel(nodeId: string, channelId: string, counterpartyNodeId: string): boolean;

  receivePayment(nodeId: string, amountMsat: number, description: string, expirySecs: number): string;
  receiveVariableAmountPayment(nodeId: string, description: string, expirySecs: number): string;
  sendPayment(nodeId: string, invoice: string): string;
  sendPaymentUsingAmount(nodeId: string, invoice: string, amountMsat: number): string;
  sendSpontaneousPayment(nodeId: string, amountMsat: number, pubKey: string): string;

  sendPaymentProbes(nodeId: string, invoice: string): boolean;
  sendPaymentProbesUsingAmount(nodeId: string, invoice: string, amountMsat: number): boolean;
  sendSpontaneousPaymentProbes(nodeId: string, amountMsat: number, pubKey: string): boolean;

  listPayments(nodeId: string): Array<PaymentDetails>;
  listPeers(nodeId: string): Array<PeerDetails>;
  listChannels(nodeId: string): Array<ChannelDetails>;

  payment(nodeId: string, paymentHash: string): any;
  removePayment(nodeId: string, paymentHash: string): boolean;

  signMessage(nodeId: string, msg: Array<number>): string;
  verifySignature(nodeId: string, msg: Array<number>, sig: string, pkey: string): boolean;
  updateChannelConfig(nodeId: string, channelId: string, counterpartyNodeId: string, channelConfigId: string): boolean;

  createEntropyMnemonic(): string;

  createChannelConfig(): string;
  acceptUnderpayingHtlcs(channelConfigId: string): boolean;
  cltvExpiryDelta(channelConfigId: string): number;
  forceCloseAvoidanceMaxFeeSatoshis(channelConfigId: string): number;
  forwardingFeeBaseMsat(channelConfigId: string): number;
  forwardingFeeProportionalMillionths(channelConfigId: string): number;

  setAcceptUnderpayingHtlcs(channelConfigId: string, value: boolean): boolean;
  setCltvExpiryDelta(channelConfigId: string, value: number): boolean;
  setForceCloseAvoidanceMaxFeeSatoshis(channelConfigId: string, valueSat: number): boolean;
  setForwardingFeeBaseMsat(channelConfigId: string, feeMsat: number): boolean;
  setForwardingFeeProportionalMillionths(channelConfigId: string, value: number): boolean;
  setMaxDustHtlcExposureFromFeeRateMultiplier(channelConfigId: string, multiplier: number): boolean;
  setMaxDustHtlcExposureFromFixedLimit(channelConfigId: string, limitMsat: number): boolean;
}

export class NativeLoader {
  _ldk: NativeLdkNodeRn;

  constructor() {
    this._ldk = NativeModules.LdkNodeRnModule;
  }
}
