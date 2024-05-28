import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'checkly-public-api/v1 (api/6.1.1)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * <b>[beta]</b> List account details based on supplied API key. (This endpoint is in beta
   * and may change without notice.)
   *
   * @summary [beta] Fetch user accounts
   * @throws FetchError<401, types.GetV1AccountsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AccountsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AccountsResponse429> Too Many Requests
   */
  getV1Accounts(metadata?: types.GetV1AccountsMetadataParam): Promise<FetchResponse<200, types.GetV1AccountsResponse200>> {
    return this.core.fetch('/v1/accounts', 'get', metadata);
  }

  /**
   * <b>[beta]</b> Get details from the current account (This endpoint is in beta and may
   * change without notice.)
   *
   * @summary [beta] Fetch current account details
   * @throws FetchError<401, types.GetV1AccountsMeResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AccountsMeResponse403> Forbidden
   * @throws FetchError<404, types.GetV1AccountsMeResponse404> Not Found
   * @throws FetchError<429, types.GetV1AccountsMeResponse429> Too Many Requests
   */
  getV1AccountsMe(metadata?: types.GetV1AccountsMeMetadataParam): Promise<FetchResponse<200, types.GetV1AccountsMeResponse200>> {
    return this.core.fetch('/v1/accounts/me', 'get', metadata);
  }

  /**
   * <b>[beta]</b> Get details from a specific account. (This endpoint is in beta and may
   * change without notice.)
   *
   * @summary [beta] Fetch a given account details
   * @throws FetchError<401, types.GetV1AccountsAccountidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AccountsAccountidResponse403> Forbidden
   * @throws FetchError<404, types.GetV1AccountsAccountidResponse404> Not Found
   * @throws FetchError<429, types.GetV1AccountsAccountidResponse429> Too Many Requests
   */
  getV1AccountsAccountid(metadata: types.GetV1AccountsAccountidMetadataParam): Promise<FetchResponse<200, types.GetV1AccountsAccountidResponse200>> {
    return this.core.fetch('/v1/accounts/{accountId}', 'get', metadata);
  }

  /**
   * Lists all configured alert channels and their subscribed checks.
   *
   * @summary List all alert channels
   * @throws FetchError<401, types.GetV1AlertchannelsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AlertchannelsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AlertchannelsResponse429> Too Many Requests
   */
  getV1Alertchannels(metadata?: types.GetV1AlertchannelsMetadataParam): Promise<FetchResponse<200, types.GetV1AlertchannelsResponse200>> {
    return this.core.fetch('/v1/alert-channels', 'get', metadata);
  }

  /**
   * Creates a new alert channel
   *
   * @summary Create an alert channel
   * @throws FetchError<401, types.PostV1AlertchannelsResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1AlertchannelsResponse402> Payment Required
   * @throws FetchError<403, types.PostV1AlertchannelsResponse403> Forbidden
   * @throws FetchError<429, types.PostV1AlertchannelsResponse429> Too Many Requests
   */
  postV1Alertchannels(body: types.PostV1AlertchannelsBodyParam, metadata?: types.PostV1AlertchannelsMetadataParam): Promise<FetchResponse<201, types.PostV1AlertchannelsResponse201>> {
    return this.core.fetch('/v1/alert-channels', 'post', body, metadata);
  }

  /**
   * Permanently removes an alert channel
   *
   * @summary Delete an alert channel
   * @throws FetchError<401, types.DeleteV1AlertchannelsIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1AlertchannelsIdResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1AlertchannelsIdResponse429> Too Many Requests
   */
  deleteV1AlertchannelsId(metadata: types.DeleteV1AlertchannelsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/alert-channels/{id}', 'delete', metadata);
  }

  /**
   * Show details of a specific alert channel.
   *
   * @summary Retrieve an alert channel
   * @throws FetchError<401, types.GetV1AlertchannelsIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AlertchannelsIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1AlertchannelsIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1AlertchannelsIdResponse429> Too Many Requests
   */
  getV1AlertchannelsId(metadata: types.GetV1AlertchannelsIdMetadataParam): Promise<FetchResponse<200, types.GetV1AlertchannelsIdResponse200>> {
    return this.core.fetch('/v1/alert-channels/{id}', 'get', metadata);
  }

  /**
   * Update an alert channel
   *
   * @summary Update an alert channel
   * @throws FetchError<401, types.PutV1AlertchannelsIdResponse401> Unauthorized
   * @throws FetchError<402, types.PutV1AlertchannelsIdResponse402> Payment Required
   * @throws FetchError<403, types.PutV1AlertchannelsIdResponse403> Forbidden
   * @throws FetchError<429, types.PutV1AlertchannelsIdResponse429> Too Many Requests
   */
  putV1AlertchannelsId(body: types.PutV1AlertchannelsIdBodyParam, metadata: types.PutV1AlertchannelsIdMetadataParam): Promise<FetchResponse<200, types.PutV1AlertchannelsIdResponse200>> {
    return this.core.fetch('/v1/alert-channels/{id}', 'put', body, metadata);
  }

  /**
   * Update the subscriptions of an alert channel. Use this to add a check to an alert
   * channel so failure and recovery alerts are send out for that check. Note: when passing
   * the subscription object, you can only specify a "checkId" or a "groupId, not both.
   *
   * @summary Update the subscriptions of an alert channel
   * @throws FetchError<401, types.PutV1AlertchannelsIdSubscriptionsResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1AlertchannelsIdSubscriptionsResponse403> Forbidden
   * @throws FetchError<404, types.PutV1AlertchannelsIdSubscriptionsResponse404> Not Found
   * @throws FetchError<429, types.PutV1AlertchannelsIdSubscriptionsResponse429> Too Many Requests
   */
  putV1AlertchannelsIdSubscriptions(body: types.PutV1AlertchannelsIdSubscriptionsBodyParam, metadata: types.PutV1AlertchannelsIdSubscriptionsMetadataParam): Promise<FetchResponse<200, types.PutV1AlertchannelsIdSubscriptionsResponse200>> {
    return this.core.fetch('/v1/alert-channels/{id}/subscriptions', 'put', body, metadata);
  }

  /**
   * Lists the alert notifications that have been sent for your account. You can filter by
   * alert channel ID or limit to only failing notifications.<br><br>Use the `to` and `from`
   * parameters to specify a date range (UNIX timestamp in seconds). This endpoint will
   * return data within a 24-hours timeframe. If the `from` and `to` params are set, they
   * must be at most 24 hours apart. If none are set, we will consider the `to` param to be
   * now and the `from` param to be 24 hours earlier. If only the `to` param is set we will
   * set `from` to be 24 hours earlier. If only the `from` param is set we will consider the
   * `to` param to be 24 hours later.<br><br><b>Rate-limiting is applied to this endpoint,
   * you can send 5 requests / 10 seconds at most.<b>
   *
   * @summary Lists all alert notifications
   * @throws FetchError<401, types.GetV1AlertnotificationsResponse401> Unauthorized
   * @throws FetchError<402, types.GetV1AlertnotificationsResponse402> Payment Required
   * @throws FetchError<403, types.GetV1AlertnotificationsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AlertnotificationsResponse429> Too Many Requests
   */
  getV1Alertnotifications(metadata?: types.GetV1AlertnotificationsMetadataParam): Promise<FetchResponse<200, types.GetV1AlertnotificationsResponse200>> {
    return this.core.fetch('/v1/alert-notifications', 'get', metadata);
  }

  /**
   * Fetch detailed availability metrics and aggregated or non-aggregated API Check metrics
   * across custom time ranges. For example, you can get the p99 and p95 of all the DNS
   * phases of your API check together with the availability percentage for any time
   * range.<br><br><b>Rate-limiting is applied to this endpoint, you can send 30 requests /
   * 60 seconds at most.<b>
   *
   * @summary API checks
   * @throws FetchError<401, types.GetV1AnalyticsApichecksIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AnalyticsApichecksIdResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AnalyticsApichecksIdResponse429> Too Many Requests
   */
  getV1AnalyticsApichecksId(metadata: types.GetV1AnalyticsApichecksIdMetadataParam): Promise<FetchResponse<200, types.GetV1AnalyticsApichecksIdResponse200>> {
    return this.core.fetch('/v1/analytics/api-checks/{id}', 'get', metadata);
  }

  /**
   * Fetch detailed availability metrics and aggregated or non-aggregated Browser Check
   * metrics across custom time ranges.  For example, you can get the average amount of
   * console errors, the p99 of your FCP and the standard deviation of your TTFB for the
   * second page in your Browser check with one API call.<br><br><b>Rate-limiting is applied
   * to this endpoint, you can send 30 requests / 60 seconds at most.<b>
   *
   * @summary Browser checks
   * @throws FetchError<401, types.GetV1AnalyticsBrowserchecksIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AnalyticsBrowserchecksIdResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AnalyticsBrowserchecksIdResponse429> Too Many Requests
   */
  getV1AnalyticsBrowserchecksId(metadata: types.GetV1AnalyticsBrowserchecksIdMetadataParam): Promise<FetchResponse<200, types.GetV1AnalyticsBrowserchecksIdResponse200>> {
    return this.core.fetch('/v1/analytics/browser-checks/{id}', 'get', metadata);
  }

  /**
   * Fetch detailed availability metrics and aggregated or non-aggregated Heartbeat Check
   * metrics across custom time ranges. <b>Rate-limiting is applied to this endpoint, you can
   * send 600 requests / 60 seconds at most.<b>
   *
   * @summary Heartbeat checks
   * @throws FetchError<401, types.GetV1AnalyticsHeartbeatchecksIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AnalyticsHeartbeatchecksIdResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AnalyticsHeartbeatchecksIdResponse429> Too Many Requests
   */
  getV1AnalyticsHeartbeatchecksId(metadata: types.GetV1AnalyticsHeartbeatchecksIdMetadataParam): Promise<FetchResponse<200, types.GetV1AnalyticsHeartbeatchecksIdResponse200>> {
    return this.core.fetch('/v1/analytics/heartbeat-checks/{id}', 'get', metadata);
  }

  /**
   * List all available reporting metrics.
   *
   * @summary List all available reporting metrics.
   * @throws FetchError<401, types.GetV1AnalyticsMetricsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AnalyticsMetricsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AnalyticsMetricsResponse429> Too Many Requests
   */
  getV1AnalyticsMetrics(metadata: types.GetV1AnalyticsMetricsMetadataParam): Promise<FetchResponse<200, types.GetV1AnalyticsMetricsResponse200>> {
    return this.core.fetch('/v1/analytics/metrics', 'get', metadata);
  }

  /**
   * Fetch detailed availability metrics and aggregated or non-aggregated Multistep Check
   * metrics across custom time ranges. <b>Rate-limiting is applied to this endpoint, you can
   * send 30 requests / 60 seconds at most.<b>
   *
   * @summary Multistep checks
   * @throws FetchError<401, types.GetV1AnalyticsMultistepchecksIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1AnalyticsMultistepchecksIdResponse403> Forbidden
   * @throws FetchError<429, types.GetV1AnalyticsMultistepchecksIdResponse429> Too Many Requests
   */
  getV1AnalyticsMultistepchecksId(metadata: types.GetV1AnalyticsMultistepchecksIdMetadataParam): Promise<FetchResponse<200, types.GetV1AnalyticsMultistepchecksIdResponse200>> {
    return this.core.fetch('/v1/analytics/multistep-checks/{id}', 'get', metadata);
  }

  /**
   * Get check status badge. You can enable the badges feature in <a
   * href="https://app.checklyhq.com/settings/account/general">account settings</a>
   *
   */
  getV1BadgesChecksCheckid(metadata: types.GetV1BadgesChecksCheckidMetadataParam): Promise<FetchResponse<200, types.GetV1BadgesChecksCheckidResponse200>> {
    return this.core.fetch('/v1/badges/checks/{checkId}', 'get', metadata);
  }

  /**
   * Get group status badge. You can enable the badges feature in <a
   * href="https://app.checklyhq.com/settings/account/general">account settings</a>
   *
   */
  getV1BadgesGroupsGroupid(metadata: types.GetV1BadgesGroupsGroupidMetadataParam): Promise<FetchResponse<200, types.GetV1BadgesGroupsGroupidResponse200>> {
    return this.core.fetch('/v1/badges/groups/{groupId}', 'get', metadata);
  }

  /**
   * Lists all alerts for your account.
   *
   * @summary List all alerts for your account
   * @throws FetchError<401, types.GetV1CheckalertsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckalertsResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckalertsResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckalertsResponse429> Too Many Requests
   */
  getV1Checkalerts(metadata?: types.GetV1CheckalertsMetadataParam): Promise<FetchResponse<200, types.GetV1CheckalertsResponse200>> {
    return this.core.fetch('/v1/check-alerts', 'get', metadata);
  }

  /**
   * Lists all the alerts for a specific check.
   *
   * @summary List alerts for a specific check
   * @throws FetchError<401, types.GetV1CheckalertsCheckidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckalertsCheckidResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckalertsCheckidResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckalertsCheckidResponse429> Too Many Requests
   */
  getV1CheckalertsCheckid(metadata: types.GetV1CheckalertsCheckidMetadataParam): Promise<FetchResponse<200, types.GetV1CheckalertsCheckidResponse200>> {
    return this.core.fetch('/v1/check-alerts/{checkId}', 'get', metadata);
  }

  /**
   * Lists all current check groups in your account. The "checks" property is an array of
   * check UUID's for convenient referencing. It is read only and you cannot use it to add
   * checks to a group.
   *
   * @summary List all check groups
   * @throws FetchError<401, types.GetV1CheckgroupsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckgroupsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1CheckgroupsResponse429> Too Many Requests
   */
  getV1Checkgroups(metadata?: types.GetV1CheckgroupsMetadataParam): Promise<FetchResponse<200, types.GetV1CheckgroupsResponse200>> {
    return this.core.fetch('/v1/check-groups', 'get', metadata);
  }

  /**
   * Creates a new check group. You can add checks to the group by setting the "groupId"
   * property of individual checks.
   *
   * @summary Create a check group
   * @throws FetchError<401, types.PostV1CheckgroupsResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1CheckgroupsResponse402> Payment Required
   * @throws FetchError<403, types.PostV1CheckgroupsResponse403> Forbidden
   * @throws FetchError<429, types.PostV1CheckgroupsResponse429> Too Many Requests
   */
  postV1Checkgroups(body: types.PostV1CheckgroupsBodyParam, metadata?: types.PostV1CheckgroupsMetadataParam): Promise<FetchResponse<201, types.PostV1CheckgroupsResponse201>> {
    return this.core.fetch('/v1/check-groups', 'post', body, metadata);
  }

  /**
   * Show details of one check in a specific check group with the group settings applied.
   *
   * @summary Retrieve one check in a specific group with group settings applied
   * @throws FetchError<401, types.GetV1CheckgroupsGroupidChecksCheckidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckgroupsGroupidChecksCheckidResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckgroupsGroupidChecksCheckidResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckgroupsGroupidChecksCheckidResponse429> Too Many Requests
   */
  getV1CheckgroupsGroupidChecksCheckid(metadata: types.GetV1CheckgroupsGroupidChecksCheckidMetadataParam): Promise<FetchResponse<200, types.GetV1CheckgroupsGroupidChecksCheckidResponse200>> {
    return this.core.fetch('/v1/check-groups/{groupId}/checks/{checkId}', 'get', metadata);
  }

  /**
   * Permanently removes a check group. You cannot delete a check group if it still contains
   * checks.
   *
   * @summary Delete a check group.
   * @throws FetchError<401, types.DeleteV1CheckgroupsIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1CheckgroupsIdResponse403> Forbidden
   * @throws FetchError<409, types.DeleteV1CheckgroupsIdResponse409> Conflict
   * @throws FetchError<429, types.DeleteV1CheckgroupsIdResponse429> Too Many Requests
   */
  deleteV1CheckgroupsId(metadata: types.DeleteV1CheckgroupsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/check-groups/{id}', 'delete', metadata);
  }

  /**
   * Show details of a specific check group
   *
   * @summary Retrieve a check group
   * @throws FetchError<401, types.GetV1CheckgroupsIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckgroupsIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckgroupsIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckgroupsIdResponse429> Too Many Requests
   */
  getV1CheckgroupsId(metadata: types.GetV1CheckgroupsIdMetadataParam): Promise<FetchResponse<200, types.GetV1CheckgroupsIdResponse200>> {
    return this.core.fetch('/v1/check-groups/{id}', 'get', metadata);
  }

  /**
   * Updates a check group.
   *
   * @summary Update a check group
   * @throws FetchError<401, types.PutV1CheckgroupsIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1CheckgroupsIdResponse403> Forbidden
   * @throws FetchError<404, types.PutV1CheckgroupsIdResponse404> Not Found
   * @throws FetchError<429, types.PutV1CheckgroupsIdResponse429> Too Many Requests
   */
  putV1CheckgroupsId(body: types.PutV1CheckgroupsIdBodyParam, metadata: types.PutV1CheckgroupsIdMetadataParam): Promise<FetchResponse<200, types.PutV1CheckgroupsIdResponse200>>;
  putV1CheckgroupsId(metadata: types.PutV1CheckgroupsIdMetadataParam): Promise<FetchResponse<200, types.PutV1CheckgroupsIdResponse200>>;
  putV1CheckgroupsId(body?: types.PutV1CheckgroupsIdBodyParam | types.PutV1CheckgroupsIdMetadataParam, metadata?: types.PutV1CheckgroupsIdMetadataParam): Promise<FetchResponse<200, types.PutV1CheckgroupsIdResponse200>> {
    return this.core.fetch('/v1/check-groups/{id}', 'put', body, metadata);
  }

  /**
   * Lists all checks in a specific check group with the group settings applied.
   *
   * @summary Retrieve all checks in a specific group with group settings applied
   * @throws FetchError<401, types.GetV1CheckgroupsIdChecksResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckgroupsIdChecksResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckgroupsIdChecksResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckgroupsIdChecksResponse429> Too Many Requests
   */
  getV1CheckgroupsIdChecks(metadata: types.GetV1CheckgroupsIdChecksMetadataParam): Promise<FetchResponse<200, types.GetV1CheckgroupsIdChecksResponse200>> {
    return this.core.fetch('/v1/check-groups/{id}/checks', 'get', metadata);
  }

  /**
   * Lists the full, raw check results for a specific check. We keep raw results for 30 days.
   * After 30 days they are erased. However, we keep the rolled up results for an indefinite
   * period.<br><br>You can filter by check type and result type to narrow down the list. Use
   * the `to` and `from` parameters to specify a date range (UNIX timestamp in seconds).
   * Depending on the check type, some fields might be null.<br><br>This endpoint will return
   * data within a six-hours timeframe. If the `from` and `to` params are set, they must be
   * at most six hours apart. If none are set, we will consider the `to` param to be now and
   * the `from` param to be six hours earlier. If only the `to` param is set we will set
   * `from` to be six hours earlier. On the contrary, if only the `from` param is set we will
   * consider the `to` param to be six hours later.<br><br><b>Rate-limiting is applied to
   * this endpoint, you can send 5 requests / 10 seconds at most.<b>
   *
   * @summary Lists all check results
   * @throws FetchError<401, types.GetV1CheckresultsCheckidResponse401> Unauthorized
   * @throws FetchError<402, types.GetV1CheckresultsCheckidResponse402> Payment Required
   * @throws FetchError<403, types.GetV1CheckresultsCheckidResponse403> Forbidden
   * @throws FetchError<429, types.GetV1CheckresultsCheckidResponse429> Too Many Requests
   */
  getV1CheckresultsCheckid(metadata: types.GetV1CheckresultsCheckidMetadataParam): Promise<FetchResponse<200, types.GetV1CheckresultsCheckidResponse200>> {
    return this.core.fetch('/v1/check-results/{checkId}', 'get', metadata);
  }

  /**
   * Show details of a specific check result.
   *
   * @summary Retrieve a check result
   * @throws FetchError<401, types.GetV1CheckresultsCheckidCheckresultidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckresultsCheckidCheckresultidResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckresultsCheckidCheckresultidResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckresultsCheckidCheckresultidResponse429> Too Many Requests
   */
  getV1CheckresultsCheckidCheckresultid(metadata: types.GetV1CheckresultsCheckidCheckresultidMetadataParam): Promise<FetchResponse<200, types.GetV1CheckresultsCheckidCheckresultidResponse200>> {
    return this.core.fetch('/v1/check-results/{checkId}/{checkResultId}', 'get', metadata);
  }

  /**
   * Shows the current status information for all checks in your account. The check status
   * records are continuously updated as new check results come in.
   *
   * @summary List all check statuses
   * @throws FetchError<401, types.GetV1CheckstatusesResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckstatusesResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckstatusesResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckstatusesResponse429> Too Many Requests
   */
  getV1Checkstatuses(metadata?: types.GetV1CheckstatusesMetadataParam): Promise<FetchResponse<200, types.GetV1CheckstatusesResponse200>> {
    return this.core.fetch('/v1/check-statuses', 'get', metadata);
  }

  /**
   * Show the current status information for a specific check.
   *
   * @summary Retrieve check status details
   * @throws FetchError<401, types.GetV1CheckstatusesCheckidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1CheckstatusesCheckidResponse403> Forbidden
   * @throws FetchError<404, types.GetV1CheckstatusesCheckidResponse404> Not Found
   * @throws FetchError<429, types.GetV1CheckstatusesCheckidResponse429> Too Many Requests
   */
  getV1CheckstatusesCheckid(metadata: types.GetV1CheckstatusesCheckidMetadataParam): Promise<FetchResponse<200, types.GetV1CheckstatusesCheckidResponse200>> {
    return this.core.fetch('/v1/check-statuses/{checkId}', 'get', metadata);
  }

  /**
   * Lists all current checks in your account.
   *
   * @summary List all checks
   * @throws FetchError<401, types.GetV1ChecksResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ChecksResponse403> Forbidden
   * @throws FetchError<429, types.GetV1ChecksResponse429> Too Many Requests
   */
  getV1Checks(metadata?: types.GetV1ChecksMetadataParam): Promise<FetchResponse<200, types.GetV1ChecksResponse200>> {
    return this.core.fetch('/v1/checks', 'get', metadata);
  }

  /**
   * <b>[DEPRECATED] This endpoint will be removed soon. Instead use <code>POST
   * /checks/api</code> or  <code>POST /checks/browser</code>.</b> Creates a new API or
   * browser check. Will return a `402` when you are over the limit of your plan.
   *     When using the `globalAlertSettings`, the `alertSettings` can be `null`
   *
   * @summary Create a check
   * @throws FetchError<401, types.PostV1ChecksResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1ChecksResponse402> Payment Required
   * @throws FetchError<403, types.PostV1ChecksResponse403> Forbidden
   * @throws FetchError<429, types.PostV1ChecksResponse429> Too Many Requests
   */
  postV1Checks(body: types.PostV1ChecksBodyParam, metadata?: types.PostV1ChecksMetadataParam): Promise<FetchResponse<201, types.PostV1ChecksResponse201>> {
    return this.core.fetch('/v1/checks', 'post', body, metadata);
  }

  /**
   * Creates a new API check. Will return a `402` when you are over the limit of your plan.
   *     When using the `globalAlertSetting`, the `alertSetting` can be `null`
   *
   * @summary Create an API check
   * @throws FetchError<401, types.PostV1ChecksApiResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1ChecksApiResponse402> Payment Required
   * @throws FetchError<403, types.PostV1ChecksApiResponse403> Forbidden
   * @throws FetchError<429, types.PostV1ChecksApiResponse429> Too Many Requests
   */
  postV1ChecksApi(body: types.PostV1ChecksApiBodyParam, metadata?: types.PostV1ChecksApiMetadataParam): Promise<FetchResponse<201, types.PostV1ChecksApiResponse201>> {
    return this.core.fetch('/v1/checks/api', 'post', body, metadata);
  }

  /**
   * Updates an API check.
   *
   * @summary Update an API check
   * @throws FetchError<401, types.PutV1ChecksApiIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1ChecksApiIdResponse403> Forbidden
   * @throws FetchError<429, types.PutV1ChecksApiIdResponse429> Too Many Requests
   */
  putV1ChecksApiId(body: types.PutV1ChecksApiIdBodyParam, metadata: types.PutV1ChecksApiIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksApiIdResponse200>>;
  putV1ChecksApiId(metadata: types.PutV1ChecksApiIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksApiIdResponse200>>;
  putV1ChecksApiId(body?: types.PutV1ChecksApiIdBodyParam | types.PutV1ChecksApiIdMetadataParam, metadata?: types.PutV1ChecksApiIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksApiIdResponse200>> {
    return this.core.fetch('/v1/checks/api/{id}', 'put', body, metadata);
  }

  /**
   * Creates a new browser check. Will return a `402` when you are over the limit of your
   * plan.
   *     When using the `globalAlertSetting`, the `alertSetting` can be `null`
   *
   * @summary Create a browser check
   * @throws FetchError<401, types.PostV1ChecksBrowserResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1ChecksBrowserResponse402> Payment Required
   * @throws FetchError<403, types.PostV1ChecksBrowserResponse403> Forbidden
   * @throws FetchError<429, types.PostV1ChecksBrowserResponse429> Too Many Requests
   */
  postV1ChecksBrowser(body: types.PostV1ChecksBrowserBodyParam, metadata?: types.PostV1ChecksBrowserMetadataParam): Promise<FetchResponse<201, types.PostV1ChecksBrowserResponse201>> {
    return this.core.fetch('/v1/checks/browser', 'post', body, metadata);
  }

  /**
   * Updates a browser check.
   *
   * @summary Update a browser check
   * @throws FetchError<401, types.PutV1ChecksBrowserIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1ChecksBrowserIdResponse403> Forbidden
   * @throws FetchError<429, types.PutV1ChecksBrowserIdResponse429> Too Many Requests
   */
  putV1ChecksBrowserId(body: types.PutV1ChecksBrowserIdBodyParam, metadata: types.PutV1ChecksBrowserIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksBrowserIdResponse200>>;
  putV1ChecksBrowserId(metadata: types.PutV1ChecksBrowserIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksBrowserIdResponse200>>;
  putV1ChecksBrowserId(body?: types.PutV1ChecksBrowserIdBodyParam | types.PutV1ChecksBrowserIdMetadataParam, metadata?: types.PutV1ChecksBrowserIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksBrowserIdResponse200>> {
    return this.core.fetch('/v1/checks/browser/{id}', 'put', body, metadata);
  }

  /**
   * Creates a new Heartbeat check. Will return a `402` when you are over the limit of your
   * plan.
   *     When using the `globalAlertSetting`, the `alertSetting` can be `null`
   *
   * @summary Create a heartbeat check
   * @throws FetchError<401, types.PostV1ChecksHeartbeatResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1ChecksHeartbeatResponse402> Payment Required
   * @throws FetchError<403, types.PostV1ChecksHeartbeatResponse403> Forbidden
   * @throws FetchError<429, types.PostV1ChecksHeartbeatResponse429> Too Many Requests
   */
  postV1ChecksHeartbeat(body: types.PostV1ChecksHeartbeatBodyParam, metadata?: types.PostV1ChecksHeartbeatMetadataParam): Promise<FetchResponse<201, types.PostV1ChecksHeartbeatResponse201>> {
    return this.core.fetch('/v1/checks/heartbeat', 'post', body, metadata);
  }

  /**
   * Updates a Heartbeat check.
   *
   * @summary Update a heartbeat check
   * @throws FetchError<401, types.PutV1ChecksHeartbeatIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1ChecksHeartbeatIdResponse403> Forbidden
   * @throws FetchError<429, types.PutV1ChecksHeartbeatIdResponse429> Too Many Requests
   */
  putV1ChecksHeartbeatId(body: types.PutV1ChecksHeartbeatIdBodyParam, metadata: types.PutV1ChecksHeartbeatIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksHeartbeatIdResponse200>> {
    return this.core.fetch('/v1/checks/heartbeat/{id}', 'put', body, metadata);
  }

  /**
   * Get heartbeat availability.
   *
   * @summary Get heartbeat availability.
   * @throws FetchError<401, types.GetV1ChecksHeartbeatsCheckidAvailabilityResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ChecksHeartbeatsCheckidAvailabilityResponse403> Forbidden
   * @throws FetchError<404, types.GetV1ChecksHeartbeatsCheckidAvailabilityResponse404> Not Found
   * @throws FetchError<429, types.GetV1ChecksHeartbeatsCheckidAvailabilityResponse429> Too Many Requests
   */
  getV1ChecksHeartbeatsCheckidAvailability(metadata: types.GetV1ChecksHeartbeatsCheckidAvailabilityMetadataParam): Promise<FetchResponse<200, types.GetV1ChecksHeartbeatsCheckidAvailabilityResponse200>> {
    return this.core.fetch('/v1/checks/heartbeats/{checkId}/availability', 'get', metadata);
  }

  /**
   * Get all events from a heartbeat.
   *
   * @summary Get a list of events for a heartbeat.
   * @throws FetchError<401, types.GetV1ChecksHeartbeatsCheckidEventsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ChecksHeartbeatsCheckidEventsResponse403> Forbidden
   * @throws FetchError<404, types.GetV1ChecksHeartbeatsCheckidEventsResponse404> Not Found
   * @throws FetchError<429, types.GetV1ChecksHeartbeatsCheckidEventsResponse429> Too Many Requests
   */
  getV1ChecksHeartbeatsCheckidEvents(metadata: types.GetV1ChecksHeartbeatsCheckidEventsMetadataParam): Promise<FetchResponse<200, types.GetV1ChecksHeartbeatsCheckidEventsResponse200>> {
    return this.core.fetch('/v1/checks/heartbeats/{checkId}/events', 'get', metadata);
  }

  /**
   * Get a specific event by its id.
   *
   * @summary Get a specific Heartbeat event.
   * @throws FetchError<401, types.GetV1ChecksHeartbeatsCheckidEventsIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ChecksHeartbeatsCheckidEventsIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1ChecksHeartbeatsCheckidEventsIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1ChecksHeartbeatsCheckidEventsIdResponse429> Too Many Requests
   */
  getV1ChecksHeartbeatsCheckidEventsId(metadata: types.GetV1ChecksHeartbeatsCheckidEventsIdMetadataParam): Promise<FetchResponse<200, types.GetV1ChecksHeartbeatsCheckidEventsIdResponse200>> {
    return this.core.fetch('/v1/checks/heartbeats/{checkId}/events/{id}', 'get', metadata);
  }

  /**
   * Creates a new Multi-Step check. Will return a `402` when you are over the limit of your
   * plan.
   *     When using the `globalAlertSetting`, the `alertSetting` can be `null`
   *
   * @summary Create a multi-step check
   * @throws FetchError<401, types.PostV1ChecksMultistepResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1ChecksMultistepResponse402> Payment Required
   * @throws FetchError<403, types.PostV1ChecksMultistepResponse403> Forbidden
   * @throws FetchError<429, types.PostV1ChecksMultistepResponse429> Too Many Requests
   */
  postV1ChecksMultistep(body: types.PostV1ChecksMultistepBodyParam, metadata?: types.PostV1ChecksMultistepMetadataParam): Promise<FetchResponse<201, types.PostV1ChecksMultistepResponse201>> {
    return this.core.fetch('/v1/checks/multistep', 'post', body, metadata);
  }

  /**
   * Updates a Multi-Step check.
   *
   * @summary Update a multi-step check
   * @throws FetchError<401, types.PutV1ChecksMultistepIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1ChecksMultistepIdResponse403> Forbidden
   * @throws FetchError<429, types.PutV1ChecksMultistepIdResponse429> Too Many Requests
   */
  putV1ChecksMultistepId(body: types.PutV1ChecksMultistepIdBodyParam, metadata: types.PutV1ChecksMultistepIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksMultistepIdResponse200>>;
  putV1ChecksMultistepId(metadata: types.PutV1ChecksMultistepIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksMultistepIdResponse200>>;
  putV1ChecksMultistepId(body?: types.PutV1ChecksMultistepIdBodyParam | types.PutV1ChecksMultistepIdMetadataParam, metadata?: types.PutV1ChecksMultistepIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksMultistepIdResponse200>> {
    return this.core.fetch('/v1/checks/multistep/{id}', 'put', body, metadata);
  }

  /**
   * Permanently removes a API or browser check and all its related status and results data.
   *
   * @summary Delete a check
   * @throws FetchError<401, types.DeleteV1ChecksIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1ChecksIdResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1ChecksIdResponse429> Too Many Requests
   */
  deleteV1ChecksId(metadata: types.DeleteV1ChecksIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/checks/{id}', 'delete', metadata);
  }

  /**
   * Show details of a specific API or browser check
   *
   * @summary Retrieve a check
   * @throws FetchError<401, types.GetV1ChecksIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ChecksIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1ChecksIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1ChecksIdResponse429> Too Many Requests
   */
  getV1ChecksId(metadata: types.GetV1ChecksIdMetadataParam): Promise<FetchResponse<200, types.GetV1ChecksIdResponse200>> {
    return this.core.fetch('/v1/checks/{id}', 'get', metadata);
  }

  /**
   * <b>[DEPRECATED] This endpoint will be removed soon. Instead use <code>PUT
   * /checks/api/{id}</code> or  <code>PUT /checks/browser/{id}</code>.</b> Updates a new API
   * or browser check.
   *
   * @summary Update a check
   * @throws FetchError<401, types.PutV1ChecksIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1ChecksIdResponse403> Forbidden
   * @throws FetchError<429, types.PutV1ChecksIdResponse429> Too Many Requests
   */
  putV1ChecksId(body: types.PutV1ChecksIdBodyParam, metadata: types.PutV1ChecksIdMetadataParam): Promise<FetchResponse<200, types.PutV1ChecksIdResponse200>> {
    return this.core.fetch('/v1/checks/{id}', 'put', body, metadata);
  }

  /**
   * Lists all client certificates.
   *
   * @throws FetchError<401, types.GetV1ClientcertificatesResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ClientcertificatesResponse403> Forbidden
   * @throws FetchError<429, types.GetV1ClientcertificatesResponse429> Too Many Requests
   */
  getV1Clientcertificates(metadata?: types.GetV1ClientcertificatesMetadataParam): Promise<FetchResponse<200, types.GetV1ClientcertificatesResponse200>> {
    return this.core.fetch('/v1/client-certificates', 'get', metadata);
  }

  /**
   * Creates a new client certificate.
   *
   * @throws FetchError<401, types.PostV1ClientcertificatesResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1ClientcertificatesResponse403> Forbidden
   * @throws FetchError<429, types.PostV1ClientcertificatesResponse429> Too Many Requests
   */
  postV1Clientcertificates(body: types.PostV1ClientcertificatesBodyParam, metadata?: types.PostV1ClientcertificatesMetadataParam): Promise<FetchResponse<201, types.PostV1ClientcertificatesResponse201>> {
    return this.core.fetch('/v1/client-certificates', 'post', body, metadata);
  }

  /**
   * Permanently removes a client certificate.
   *
   * @summary Deletes a client certificate.
   * @throws FetchError<401, types.DeleteV1ClientcertificatesIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1ClientcertificatesIdResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1ClientcertificatesIdResponse429> Too Many Requests
   */
  deleteV1ClientcertificatesId(metadata: types.DeleteV1ClientcertificatesIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/client-certificates/{id}', 'delete', metadata);
  }

  /**
   * Shows one client certificate.
   *
   * @throws FetchError<401, types.GetV1ClientcertificatesIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ClientcertificatesIdResponse403> Forbidden
   * @throws FetchError<429, types.GetV1ClientcertificatesIdResponse429> Too Many Requests
   */
  getV1ClientcertificatesId(metadata: types.GetV1ClientcertificatesIdMetadataParam): Promise<FetchResponse<200, types.GetV1ClientcertificatesIdResponse200>> {
    return this.core.fetch('/v1/client-certificates/{id}', 'get', metadata);
  }

  /**
   * Lists all current dashboards in your account.
   *
   * @summary List all dashboards
   * @throws FetchError<401, types.GetV1DashboardsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1DashboardsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1DashboardsResponse429> Too Many Requests
   */
  getV1Dashboards(metadata?: types.GetV1DashboardsMetadataParam): Promise<FetchResponse<200, types.GetV1DashboardsResponse200>> {
    return this.core.fetch('/v1/dashboards', 'get', metadata);
  }

  /**
   * Creates a new dashboard. Will return a 409 when attempting to create a dashboard with a
   * custom URL or custom domain that is already taken.
   *
   * @summary Create a dashboard
   * @throws FetchError<401, types.PostV1DashboardsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1DashboardsResponse403> Forbidden
   * @throws FetchError<409, types.PostV1DashboardsResponse409> Conflict
   * @throws FetchError<429, types.PostV1DashboardsResponse429> Too Many Requests
   */
  postV1Dashboards(body: types.PostV1DashboardsBodyParam, metadata?: types.PostV1DashboardsMetadataParam): Promise<FetchResponse<201, types.PostV1DashboardsResponse201>> {
    return this.core.fetch('/v1/dashboards', 'post', body, metadata);
  }

  /**
   * Permanently removes a dashboard.
   *
   * @summary Delete a dashboard
   * @throws FetchError<401, types.DeleteV1DashboardsDashboardidResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1DashboardsDashboardidResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1DashboardsDashboardidResponse429> Too Many Requests
   */
  deleteV1DashboardsDashboardid(metadata: types.DeleteV1DashboardsDashboardidMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/dashboards/{dashboardId}', 'delete', metadata);
  }

  /**
   * Show details of a specific dashboard.<br><br><b>Rate-limiting is applied to this
   * endpoint, you can send 10 requests / 20 seconds at most.<b>
   *
   * @summary Retrieve a dashboard
   * @throws FetchError<401, types.GetV1DashboardsDashboardidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1DashboardsDashboardidResponse403> Forbidden
   * @throws FetchError<404, types.GetV1DashboardsDashboardidResponse404> Not Found
   * @throws FetchError<429, types.GetV1DashboardsDashboardidResponse429> Too Many Requests
   */
  getV1DashboardsDashboardid(metadata: types.GetV1DashboardsDashboardidMetadataParam): Promise<FetchResponse<200, types.GetV1DashboardsDashboardidResponse200>> {
    return this.core.fetch('/v1/dashboards/{dashboardId}', 'get', metadata);
  }

  /**
   * Updates a dashboard. Will return a 409 when attempting to create a dashboard with a
   * custom URL or custom domain that is already taken.
   *
   * @summary Update a dashboard
   * @throws FetchError<401, types.PutV1DashboardsDashboardidResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1DashboardsDashboardidResponse403> Forbidden
   * @throws FetchError<404, types.PutV1DashboardsDashboardidResponse404> Not Found
   * @throws FetchError<409, types.PutV1DashboardsDashboardidResponse409> Conflict
   * @throws FetchError<429, types.PutV1DashboardsDashboardidResponse429> Too Many Requests
   */
  putV1DashboardsDashboardid(body: types.PutV1DashboardsDashboardidBodyParam, metadata: types.PutV1DashboardsDashboardidMetadataParam): Promise<FetchResponse<200, types.PutV1DashboardsDashboardidResponse200>>;
  putV1DashboardsDashboardid(metadata: types.PutV1DashboardsDashboardidMetadataParam): Promise<FetchResponse<200, types.PutV1DashboardsDashboardidResponse200>>;
  putV1DashboardsDashboardid(body?: types.PutV1DashboardsDashboardidBodyParam | types.PutV1DashboardsDashboardidMetadataParam, metadata?: types.PutV1DashboardsDashboardidMetadataParam): Promise<FetchResponse<200, types.PutV1DashboardsDashboardidResponse200>> {
    return this.core.fetch('/v1/dashboards/{dashboardId}', 'put', body, metadata);
  }

  /**
   * Creates a new incident.
   *
   * @summary Create an incident
   * @throws FetchError<401, types.PostV1IncidentsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1IncidentsResponse403> Forbidden
   * @throws FetchError<404, types.PostV1IncidentsResponse404> Not Found
   * @throws FetchError<429, types.PostV1IncidentsResponse429> Too Many Requests
   */
  postV1Incidents(body: types.PostV1IncidentsBodyParam, metadata?: types.PostV1IncidentsMetadataParam): Promise<FetchResponse<200, types.PostV1IncidentsResponse200>> {
    return this.core.fetch('/v1/incidents', 'post', body, metadata);
  }

  /**
   * Permanently removes an incident and all its updates.
   *
   * @summary Delete an incident
   * @throws FetchError<401, types.DeleteV1IncidentsIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1IncidentsIdResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1IncidentsIdResponse429> Too Many Requests
   */
  deleteV1IncidentsId(metadata: types.DeleteV1IncidentsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/incidents/{id}', 'delete', metadata);
  }

  /**
   * Shows details of a specific incident. Uses the "includeAllIncidentUpdates" query
   * parameter to obtain all updates.
   *
   * @summary Retrieve an incident
   * @throws FetchError<401, types.GetV1IncidentsIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1IncidentsIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1IncidentsIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1IncidentsIdResponse429> Too Many Requests
   */
  getV1IncidentsId(metadata: types.GetV1IncidentsIdMetadataParam): Promise<FetchResponse<200, types.GetV1IncidentsIdResponse200>> {
    return this.core.fetch('/v1/incidents/{id}', 'get', metadata);
  }

  /**
   * Updates an incident.
   *
   * @summary Update an incident
   * @throws FetchError<401, types.PutV1IncidentsIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1IncidentsIdResponse403> Forbidden
   * @throws FetchError<404, types.PutV1IncidentsIdResponse404> Not Found
   * @throws FetchError<429, types.PutV1IncidentsIdResponse429> Too Many Requests
   */
  putV1IncidentsId(body: types.PutV1IncidentsIdBodyParam, metadata: types.PutV1IncidentsIdMetadataParam): Promise<FetchResponse<200, types.PutV1IncidentsIdResponse200>> {
    return this.core.fetch('/v1/incidents/{id}', 'put', body, metadata);
  }

  /**
   * Creates a new update for an incident.
   *
   * @summary Create an incident udpate
   * @throws FetchError<401, types.PostV1IncidentsIncidentidUpdatesResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1IncidentsIncidentidUpdatesResponse403> Forbidden
   * @throws FetchError<404, types.PostV1IncidentsIncidentidUpdatesResponse404> Not Found
   * @throws FetchError<429, types.PostV1IncidentsIncidentidUpdatesResponse429> Too Many Requests
   */
  postV1IncidentsIncidentidUpdates(body: types.PostV1IncidentsIncidentidUpdatesBodyParam, metadata: types.PostV1IncidentsIncidentidUpdatesMetadataParam): Promise<FetchResponse<200, types.PostV1IncidentsIncidentidUpdatesResponse200>> {
    return this.core.fetch('/v1/incidents/{incidentId}/updates', 'post', body, metadata);
  }

  /**
   * Permanently removes an incident update.
   *
   * @summary Delete an incident udpate
   * @throws FetchError<401, types.DeleteV1IncidentsIncidentidUpdatesIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1IncidentsIncidentidUpdatesIdResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1IncidentsIncidentidUpdatesIdResponse429> Too Many Requests
   */
  deleteV1IncidentsIncidentidUpdatesId(metadata: types.DeleteV1IncidentsIncidentidUpdatesIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/incidents/{incidentId}/updates/{id}', 'delete', metadata);
  }

  /**
   * Modifies an incident update.
   *
   * @summary Update an incident udpate
   * @throws FetchError<401, types.PutV1IncidentsIncidentidUpdatesIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1IncidentsIncidentidUpdatesIdResponse403> Forbidden
   * @throws FetchError<404, types.PutV1IncidentsIncidentidUpdatesIdResponse404> Not Found
   * @throws FetchError<429, types.PutV1IncidentsIncidentidUpdatesIdResponse429> Too Many Requests
   */
  putV1IncidentsIncidentidUpdatesId(body: types.PutV1IncidentsIncidentidUpdatesIdBodyParam, metadata: types.PutV1IncidentsIncidentidUpdatesIdMetadataParam): Promise<FetchResponse<200, types.PutV1IncidentsIncidentidUpdatesIdResponse200>> {
    return this.core.fetch('/v1/incidents/{incidentId}/updates/{id}', 'put', body, metadata);
  }

  /**
   * Lists all supported locationss.
   *
   * @summary Lists all supported locations
   * @throws FetchError<429, types.GetV1LocationsResponse429> Too Many Requests
   */
  getV1Locations(metadata?: types.GetV1LocationsMetadataParam): Promise<FetchResponse<200, types.GetV1LocationsResponse200>> {
    return this.core.fetch('/v1/locations', 'get', metadata);
  }

  /**
   * Lists all maintenance windows in your account.
   *
   * @summary List all maintenance windows
   * @throws FetchError<401, types.GetV1MaintenancewindowsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1MaintenancewindowsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1MaintenancewindowsResponse429> Too Many Requests
   */
  getV1Maintenancewindows(metadata?: types.GetV1MaintenancewindowsMetadataParam): Promise<FetchResponse<200, types.GetV1MaintenancewindowsResponse200>> {
    return this.core.fetch('/v1/maintenance-windows', 'get', metadata);
  }

  /**
   * Creates a new maintenance window.
   *
   * @summary Create a maintenance window
   * @throws FetchError<401, types.PostV1MaintenancewindowsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1MaintenancewindowsResponse403> Forbidden
   * @throws FetchError<429, types.PostV1MaintenancewindowsResponse429> Too Many Requests
   */
  postV1Maintenancewindows(body: types.PostV1MaintenancewindowsBodyParam, metadata?: types.PostV1MaintenancewindowsMetadataParam): Promise<FetchResponse<201, types.PostV1MaintenancewindowsResponse201>> {
    return this.core.fetch('/v1/maintenance-windows', 'post', body, metadata);
  }

  /**
   * Permanently removes a maintenance window.
   *
   * @summary Delete a maintenance window
   * @throws FetchError<401, types.DeleteV1MaintenancewindowsIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1MaintenancewindowsIdResponse403> Forbidden
   * @throws FetchError<404, types.DeleteV1MaintenancewindowsIdResponse404> Not Found
   * @throws FetchError<429, types.DeleteV1MaintenancewindowsIdResponse429> Too Many Requests
   */
  deleteV1MaintenancewindowsId(metadata: types.DeleteV1MaintenancewindowsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/maintenance-windows/{id}', 'delete', metadata);
  }

  /**
   * Show details of a specific maintenance window.
   *
   * @summary Retrieve a maintenance window
   * @throws FetchError<401, types.GetV1MaintenancewindowsIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1MaintenancewindowsIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1MaintenancewindowsIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1MaintenancewindowsIdResponse429> Too Many Requests
   */
  getV1MaintenancewindowsId(metadata: types.GetV1MaintenancewindowsIdMetadataParam): Promise<FetchResponse<200, types.GetV1MaintenancewindowsIdResponse200>> {
    return this.core.fetch('/v1/maintenance-windows/{id}', 'get', metadata);
  }

  /**
   * Updates a maintenance window.
   *
   * @summary Update a maintenance window
   * @throws FetchError<401, types.PutV1MaintenancewindowsIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1MaintenancewindowsIdResponse403> Forbidden
   * @throws FetchError<404, types.PutV1MaintenancewindowsIdResponse404> Not Found
   * @throws FetchError<429, types.PutV1MaintenancewindowsIdResponse429> Too Many Requests
   */
  putV1MaintenancewindowsId(body: types.PutV1MaintenancewindowsIdBodyParam, metadata: types.PutV1MaintenancewindowsIdMetadataParam): Promise<FetchResponse<200, types.PutV1MaintenancewindowsIdResponse200>> {
    return this.core.fetch('/v1/maintenance-windows/{id}', 'put', body, metadata);
  }

  /**
   * Lists all private locations in your account.
   *
   * @summary List all private locations
   * @throws FetchError<401, types.GetV1PrivatelocationsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1PrivatelocationsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1PrivatelocationsResponse429> Too Many Requests
   */
  getV1Privatelocations(metadata?: types.GetV1PrivatelocationsMetadataParam): Promise<FetchResponse<200, types.GetV1PrivatelocationsResponse200>> {
    return this.core.fetch('/v1/private-locations', 'get', metadata);
  }

  /**
   * Creates a new private location.
   *
   * @summary Create a private location
   * @throws FetchError<401, types.PostV1PrivatelocationsResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1PrivatelocationsResponse402> Payment Required
   * @throws FetchError<403, types.PostV1PrivatelocationsResponse403> Forbidden
   * @throws FetchError<429, types.PostV1PrivatelocationsResponse429> Too Many Requests
   */
  postV1Privatelocations(body: types.PostV1PrivatelocationsBodyParam, metadata?: types.PostV1PrivatelocationsMetadataParam): Promise<FetchResponse<201, types.PostV1PrivatelocationsResponse201>> {
    return this.core.fetch('/v1/private-locations', 'post', body, metadata);
  }

  /**
   * Permanently removes a private location.
   *
   * @summary Remove a private location
   * @throws FetchError<401, types.DeleteV1PrivatelocationsIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1PrivatelocationsIdResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1PrivatelocationsIdResponse429> Too Many Requests
   */
  deleteV1PrivatelocationsId(metadata: types.DeleteV1PrivatelocationsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/private-locations/{id}', 'delete', metadata);
  }

  /**
   * Show details of a specific private location.
   *
   * @summary Retrieve a private location
   * @throws FetchError<401, types.GetV1PrivatelocationsIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1PrivatelocationsIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1PrivatelocationsIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1PrivatelocationsIdResponse429> Too Many Requests
   */
  getV1PrivatelocationsId(metadata: types.GetV1PrivatelocationsIdMetadataParam): Promise<FetchResponse<200, types.GetV1PrivatelocationsIdResponse200>> {
    return this.core.fetch('/v1/private-locations/{id}', 'get', metadata);
  }

  /**
   * Updates a private location.
   *
   * @summary Update a private location
   * @throws FetchError<401, types.PutV1PrivatelocationsIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1PrivatelocationsIdResponse403> Forbidden
   * @throws FetchError<429, types.PutV1PrivatelocationsIdResponse429> Too Many Requests
   */
  putV1PrivatelocationsId(body: types.PutV1PrivatelocationsIdBodyParam, metadata: types.PutV1PrivatelocationsIdMetadataParam): Promise<FetchResponse<200, types.PutV1PrivatelocationsIdResponse200>> {
    return this.core.fetch('/v1/private-locations/{id}', 'put', body, metadata);
  }

  /**
   * Creates an api key on the private location.
   *
   * @summary Generate a new API Key for a private location
   * @throws FetchError<401, types.PostV1PrivatelocationsIdKeysResponse401> Unauthorized
   * @throws FetchError<402, types.PostV1PrivatelocationsIdKeysResponse402> Payment Required
   * @throws FetchError<403, types.PostV1PrivatelocationsIdKeysResponse403> Forbidden
   * @throws FetchError<429, types.PostV1PrivatelocationsIdKeysResponse429> Too Many Requests
   */
  postV1PrivatelocationsIdKeys(metadata: types.PostV1PrivatelocationsIdKeysMetadataParam): Promise<FetchResponse<201, types.PostV1PrivatelocationsIdKeysResponse201>> {
    return this.core.fetch('/v1/private-locations/{id}/keys', 'post', metadata);
  }

  /**
   * Permanently removes an api key from a private location.
   *
   * @summary Remove an existing API key for a private location
   * @throws FetchError<401, types.DeleteV1PrivatelocationsIdKeysKeyidResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1PrivatelocationsIdKeysKeyidResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1PrivatelocationsIdKeysKeyidResponse429> Too Many Requests
   */
  deleteV1PrivatelocationsIdKeysKeyid(metadata: types.DeleteV1PrivatelocationsIdKeysKeyidMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/private-locations/{id}/keys/{keyId}', 'delete', metadata);
  }

  /**
   * Get private location health metrics from a window of time.<br><br><b>Rate-limiting is
   * applied to this endpoint, you can send 300 requests per day at most.<b>
   *
   * @summary Get private location health metrics from a window of time.
   * @throws FetchError<401, types.GetV1PrivatelocationsIdMetricsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1PrivatelocationsIdMetricsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1PrivatelocationsIdMetricsResponse429> Too Many Requests
   */
  getV1PrivatelocationsIdMetrics(metadata: types.GetV1PrivatelocationsIdMetricsMetadataParam): Promise<FetchResponse<200, types.GetV1PrivatelocationsIdMetricsResponse200>> {
    return this.core.fetch('/v1/private-locations/{id}/metrics', 'get', metadata);
  }

  /**
   * Generates a report with aggregated statistics for all checks or a filtered set of checks
   * over a specified time window.
   *
   * @summary Generates a report with aggregate statistics for checks and check groups.
   * @throws FetchError<401, types.GetV1ReportingResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1ReportingResponse403> Forbidden
   * @throws FetchError<429, types.GetV1ReportingResponse429> Too Many Requests
   */
  getV1Reporting(metadata?: types.GetV1ReportingMetadataParam): Promise<FetchResponse<200, types.GetV1ReportingResponse200>> {
    return this.core.fetch('/v1/reporting', 'get', metadata);
  }

  /**
   * Lists all supported runtimes and the included NPM packages for Browser checks and setup
   * & teardown scripts for API checks.
   *
   * @summary Lists all supported runtimes
   * @throws FetchError<429, types.GetV1RuntimesResponse429> Too Many Requests
   */
  getV1Runtimes(metadata?: types.GetV1RuntimesMetadataParam): Promise<FetchResponse<200, types.GetV1RuntimesResponse200>> {
    return this.core.fetch('/v1/runtimes', 'get', metadata);
  }

  /**
   * Shows the details of all included NPM packages and their version for one specific
   * runtime
   *
   * @summary Shows details for one specific runtime
   * @throws FetchError<404, types.GetV1RuntimesIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1RuntimesIdResponse429> Too Many Requests
   */
  getV1RuntimesId(metadata: types.GetV1RuntimesIdMetadataParam): Promise<FetchResponse<200, types.GetV1RuntimesIdResponse200>> {
    return this.core.fetch('/v1/runtimes/{id}', 'get', metadata);
  }

  /**
   * Lists all current snippets in your account.
   *
   * @summary List all snippets
   * @throws FetchError<401, types.GetV1SnippetsResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1SnippetsResponse403> Forbidden
   * @throws FetchError<429, types.GetV1SnippetsResponse429> Too Many Requests
   */
  getV1Snippets(metadata?: types.GetV1SnippetsMetadataParam): Promise<FetchResponse<200, types.GetV1SnippetsResponse200>> {
    return this.core.fetch('/v1/snippets', 'get', metadata);
  }

  /**
   * Creates a new snippet.
   *
   * @summary Create a snippet
   * @throws FetchError<401, types.PostV1SnippetsResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1SnippetsResponse403> Forbidden
   * @throws FetchError<429, types.PostV1SnippetsResponse429> Too Many Requests
   */
  postV1Snippets(body: types.PostV1SnippetsBodyParam, metadata?: types.PostV1SnippetsMetadataParam): Promise<FetchResponse<201, types.PostV1SnippetsResponse201>> {
    return this.core.fetch('/v1/snippets', 'post', body, metadata);
  }

  /**
   * Permanently removes a snippet.
   *
   * @summary Delete a snippet
   * @throws FetchError<401, types.DeleteV1SnippetsIdResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1SnippetsIdResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1SnippetsIdResponse429> Too Many Requests
   */
  deleteV1SnippetsId(metadata: types.DeleteV1SnippetsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/snippets/{id}', 'delete', metadata);
  }

  /**
   * Show details of a specific snippet.
   *
   * @summary Retrieve a snippet
   * @throws FetchError<401, types.GetV1SnippetsIdResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1SnippetsIdResponse403> Forbidden
   * @throws FetchError<404, types.GetV1SnippetsIdResponse404> Not Found
   * @throws FetchError<429, types.GetV1SnippetsIdResponse429> Too Many Requests
   */
  getV1SnippetsId(metadata: types.GetV1SnippetsIdMetadataParam): Promise<FetchResponse<200, types.GetV1SnippetsIdResponse200>> {
    return this.core.fetch('/v1/snippets/{id}', 'get', metadata);
  }

  /**
   * Updates a snippet.
   *
   * @summary Update a snippet
   * @throws FetchError<401, types.PutV1SnippetsIdResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1SnippetsIdResponse403> Forbidden
   * @throws FetchError<404, types.PutV1SnippetsIdResponse404> Not Found
   * @throws FetchError<429, types.PutV1SnippetsIdResponse429> Too Many Requests
   */
  putV1SnippetsId(body: types.PutV1SnippetsIdBodyParam, metadata: types.PutV1SnippetsIdMetadataParam): Promise<FetchResponse<200, types.PutV1SnippetsIdResponse200>> {
    return this.core.fetch('/v1/snippets/{id}', 'put', body, metadata);
  }

  /**
   * Lists all source IPs for check runs as a single JSON array.
   *
   * @summary Lists all source IPs for check runs
   * @throws FetchError<429, types.GetV1StaticipsResponse429> Too Many Requests
   */
  getV1Staticips(metadata?: types.GetV1StaticipsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/static-ips', 'get', metadata);
  }

  /**
   * Lists all source IPs for check runs as object with regions as keys and an array of IPs
   * as value.
   *
   * @summary Lists all source IPs for check runs
   * @throws FetchError<429, types.GetV1StaticipsbyregionResponse429> Too Many Requests
   */
  getV1Staticipsbyregion(metadata?: types.GetV1StaticipsbyregionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/static-ips-by-region', 'get', metadata);
  }

  /**
   * Lists all IPs for check runs as a TXT file. Each line has one IP.
   *
   * @summary Lists all source IPs for check runs as txt file
   * @throws FetchError<429, types.GetV1StaticipstxtResponse429> Too Many Requests
   */
  getV1Staticipstxt(metadata?: types.GetV1StaticipstxtMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/static-ips.txt', 'get', metadata);
  }

  /**
   * Lists all source IPv6s for check runs as a single JSON array.
   *
   * @summary Lists all source IPv6s for check runs
   * @throws FetchError<429, types.GetV1Staticipv6SResponse429> Too Many Requests
   */
  getV1Staticipv6s(metadata?: types.GetV1Staticipv6SMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/static-ipv6s', 'get', metadata);
  }

  /**
   * Lists all source IPs for check runs as an object with regions as keys and an Ipv6 as
   * value.
   *
   * @summary Lists all source IPv6s for check runs
   * @throws FetchError<429, types.GetV1Staticipv6SbyregionResponse429> Too Many Requests
   */
  getV1Staticipv6sbyregion(metadata?: types.GetV1Staticipv6SbyregionMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/static-ipv6s-by-region', 'get', metadata);
  }

  /**
   * Lists all IPv6s for check runs as a TXT file. Each line has one IP.
   *
   * @summary Lists all source IPv6s for check runs as a txt file
   * @throws FetchError<429, types.GetV1Staticipv6StxtResponse429> Too Many Requests
   */
  getV1Staticipv6stxt(metadata?: types.GetV1Staticipv6StxtMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/static-ipv6s.txt', 'get', metadata);
  }

  /**
   * <b>[DEPRECATED]</b> This endpoint will be removed soon. Please use the <a
   * href="https://www.checklyhq.com/docs/cli">Checkly CLI</a> to test and trigger checks.
   * Deletes the check groups trigger
   *
   * @summary Delete the check group trigger
   * @throws FetchError<401, types.DeleteV1TriggersCheckgroupsGroupidResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1TriggersCheckgroupsGroupidResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1TriggersCheckgroupsGroupidResponse429> Too Many Requests
   */
  deleteV1TriggersCheckgroupsGroupid(metadata: types.DeleteV1TriggersCheckgroupsGroupidMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/triggers/check-groups/{groupId}', 'delete', metadata);
  }

  /**
   * <b>[DEPRECATED]</b> This endpoint will be removed soon. Please use the <a
   * href="https://www.checklyhq.com/docs/cli">Checkly CLI</a> to test and trigger checks.
   * Finds the check group trigger
   *
   * @summary Get the check group trigger
   * @throws FetchError<401, types.GetV1TriggersCheckgroupsGroupidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1TriggersCheckgroupsGroupidResponse403> Forbidden
   * @throws FetchError<429, types.GetV1TriggersCheckgroupsGroupidResponse429> Too Many Requests
   */
  getV1TriggersCheckgroupsGroupid(metadata: types.GetV1TriggersCheckgroupsGroupidMetadataParam): Promise<FetchResponse<200, types.GetV1TriggersCheckgroupsGroupidResponse200>> {
    return this.core.fetch('/v1/triggers/check-groups/{groupId}', 'get', metadata);
  }

  /**
   * <b>[DEPRECATED]</b> This endpoint will be removed soon. Please use the <a
   * href="https://www.checklyhq.com/docs/cli">Checkly CLI</a> to test and trigger checks.
   * Creates the check group trigger
   *
   * @summary Create the check group trigger
   * @throws FetchError<401, types.PostV1TriggersCheckgroupsGroupidResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1TriggersCheckgroupsGroupidResponse403> Forbidden
   * @throws FetchError<429, types.PostV1TriggersCheckgroupsGroupidResponse429> Too Many Requests
   */
  postV1TriggersCheckgroupsGroupid(metadata: types.PostV1TriggersCheckgroupsGroupidMetadataParam): Promise<FetchResponse<201, types.PostV1TriggersCheckgroupsGroupidResponse201>> {
    return this.core.fetch('/v1/triggers/check-groups/{groupId}', 'post', metadata);
  }

  /**
   * <b>[DEPRECATED]</b> This endpoint will be removed soon. Please use the <a
   * href="https://www.checklyhq.com/docs/cli">Checkly CLI</a> to test and trigger checks.
   * Deletes the check trigger
   *
   * @summary Delete the check trigger
   * @throws FetchError<401, types.DeleteV1TriggersChecksCheckidResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1TriggersChecksCheckidResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1TriggersChecksCheckidResponse429> Too Many Requests
   */
  deleteV1TriggersChecksCheckid(metadata: types.DeleteV1TriggersChecksCheckidMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/triggers/checks/{checkId}', 'delete', metadata);
  }

  /**
   * <b>[DEPRECATED]</b> This endpoint will be removed soon. Please use the <a
   * href="https://www.checklyhq.com/docs/cli">Checkly CLI</a> to test and trigger checks.
   * Finds the check trigger.
   *
   * @summary Get the check trigger
   * @throws FetchError<401, types.GetV1TriggersChecksCheckidResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1TriggersChecksCheckidResponse403> Forbidden
   * @throws FetchError<429, types.GetV1TriggersChecksCheckidResponse429> Too Many Requests
   */
  getV1TriggersChecksCheckid(metadata: types.GetV1TriggersChecksCheckidMetadataParam): Promise<FetchResponse<200, types.GetV1TriggersChecksCheckidResponse200>> {
    return this.core.fetch('/v1/triggers/checks/{checkId}', 'get', metadata);
  }

  /**
   * <b>[DEPRECATED]</b> This endpoint will be removed soon. Please use the <a
   * href="https://www.checklyhq.com/docs/cli">Checkly CLI</a> to test and trigger checks.
   * Creates the check trigger
   *
   * @summary Create the check trigger
   * @throws FetchError<401, types.PostV1TriggersChecksCheckidResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1TriggersChecksCheckidResponse403> Forbidden
   * @throws FetchError<429, types.PostV1TriggersChecksCheckidResponse429> Too Many Requests
   */
  postV1TriggersChecksCheckid(metadata: types.PostV1TriggersChecksCheckidMetadataParam): Promise<FetchResponse<201, types.PostV1TriggersChecksCheckidResponse201>> {
    return this.core.fetch('/v1/triggers/checks/{checkId}', 'post', metadata);
  }

  /**
   * Lists all current environment variables in your account.
   *
   * @summary List all environment variables
   * @throws FetchError<401, types.GetV1VariablesResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1VariablesResponse403> Forbidden
   * @throws FetchError<429, types.GetV1VariablesResponse429> Too Many Requests
   */
  getV1Variables(metadata?: types.GetV1VariablesMetadataParam): Promise<FetchResponse<200, types.GetV1VariablesResponse200>> {
    return this.core.fetch('/v1/variables', 'get', metadata);
  }

  /**
   * Creates a new environment variable.
   *
   * @summary Create a environment variable
   * @throws FetchError<401, types.PostV1VariablesResponse401> Unauthorized
   * @throws FetchError<403, types.PostV1VariablesResponse403> Forbidden
   * @throws FetchError<429, types.PostV1VariablesResponse429> Too Many Requests
   */
  postV1Variables(body: types.PostV1VariablesBodyParam, metadata?: types.PostV1VariablesMetadataParam): Promise<FetchResponse<201, types.PostV1VariablesResponse201>> {
    return this.core.fetch('/v1/variables', 'post', body, metadata);
  }

  /**
   * Permanently removes an environment variable. Uses the "key" field as the ID for
   * deletion.
   *
   * @summary Delete an environment variable
   * @throws FetchError<401, types.DeleteV1VariablesKeyResponse401> Unauthorized
   * @throws FetchError<403, types.DeleteV1VariablesKeyResponse403> Forbidden
   * @throws FetchError<429, types.DeleteV1VariablesKeyResponse429> Too Many Requests
   */
  deleteV1VariablesKey(metadata: types.DeleteV1VariablesKeyMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/variables/{key}', 'delete', metadata);
  }

  /**
   * Show details of a specific environment variable. Uses the "key" field for selection.
   *
   * @summary Retrieve an environment variable
   * @throws FetchError<401, types.GetV1VariablesKeyResponse401> Unauthorized
   * @throws FetchError<403, types.GetV1VariablesKeyResponse403> Forbidden
   * @throws FetchError<404, types.GetV1VariablesKeyResponse404> Not Found
   * @throws FetchError<429, types.GetV1VariablesKeyResponse429> Too Many Requests
   */
  getV1VariablesKey(metadata: types.GetV1VariablesKeyMetadataParam): Promise<FetchResponse<200, types.GetV1VariablesKeyResponse200>> {
    return this.core.fetch('/v1/variables/{key}', 'get', metadata);
  }

  /**
   * Updates an environment variable. Uses the "key" field as the ID for updating. Only
   * updates value and locked property.
   *
   * @summary Update a environment variable
   * @throws FetchError<401, types.PutV1VariablesKeyResponse401> Unauthorized
   * @throws FetchError<403, types.PutV1VariablesKeyResponse403> Forbidden
   * @throws FetchError<404, types.PutV1VariablesKeyResponse404> Not Found
   * @throws FetchError<429, types.PutV1VariablesKeyResponse429> Too Many Requests
   */
  putV1VariablesKey(body: types.PutV1VariablesKeyBodyParam, metadata: types.PutV1VariablesKeyMetadataParam): Promise<FetchResponse<200, types.PutV1VariablesKeyResponse200>> {
    return this.core.fetch('/v1/variables/{key}', 'put', body, metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { DeleteV1AlertchannelsIdMetadataParam, DeleteV1AlertchannelsIdResponse401, DeleteV1AlertchannelsIdResponse403, DeleteV1AlertchannelsIdResponse429, DeleteV1CheckgroupsIdMetadataParam, DeleteV1CheckgroupsIdResponse401, DeleteV1CheckgroupsIdResponse403, DeleteV1CheckgroupsIdResponse409, DeleteV1CheckgroupsIdResponse429, DeleteV1ChecksIdMetadataParam, DeleteV1ChecksIdResponse401, DeleteV1ChecksIdResponse403, DeleteV1ChecksIdResponse429, DeleteV1ClientcertificatesIdMetadataParam, DeleteV1ClientcertificatesIdResponse401, DeleteV1ClientcertificatesIdResponse403, DeleteV1ClientcertificatesIdResponse429, DeleteV1DashboardsDashboardidMetadataParam, DeleteV1DashboardsDashboardidResponse401, DeleteV1DashboardsDashboardidResponse403, DeleteV1DashboardsDashboardidResponse429, DeleteV1IncidentsIdMetadataParam, DeleteV1IncidentsIdResponse401, DeleteV1IncidentsIdResponse403, DeleteV1IncidentsIdResponse429, DeleteV1IncidentsIncidentidUpdatesIdMetadataParam, DeleteV1IncidentsIncidentidUpdatesIdResponse401, DeleteV1IncidentsIncidentidUpdatesIdResponse403, DeleteV1IncidentsIncidentidUpdatesIdResponse429, DeleteV1MaintenancewindowsIdMetadataParam, DeleteV1MaintenancewindowsIdResponse401, DeleteV1MaintenancewindowsIdResponse403, DeleteV1MaintenancewindowsIdResponse404, DeleteV1MaintenancewindowsIdResponse429, DeleteV1PrivatelocationsIdKeysKeyidMetadataParam, DeleteV1PrivatelocationsIdKeysKeyidResponse401, DeleteV1PrivatelocationsIdKeysKeyidResponse403, DeleteV1PrivatelocationsIdKeysKeyidResponse429, DeleteV1PrivatelocationsIdMetadataParam, DeleteV1PrivatelocationsIdResponse401, DeleteV1PrivatelocationsIdResponse403, DeleteV1PrivatelocationsIdResponse429, DeleteV1SnippetsIdMetadataParam, DeleteV1SnippetsIdResponse401, DeleteV1SnippetsIdResponse403, DeleteV1SnippetsIdResponse429, DeleteV1TriggersCheckgroupsGroupidMetadataParam, DeleteV1TriggersCheckgroupsGroupidResponse401, DeleteV1TriggersCheckgroupsGroupidResponse403, DeleteV1TriggersCheckgroupsGroupidResponse429, DeleteV1TriggersChecksCheckidMetadataParam, DeleteV1TriggersChecksCheckidResponse401, DeleteV1TriggersChecksCheckidResponse403, DeleteV1TriggersChecksCheckidResponse429, DeleteV1VariablesKeyMetadataParam, DeleteV1VariablesKeyResponse401, DeleteV1VariablesKeyResponse403, DeleteV1VariablesKeyResponse429, GetV1AccountsAccountidMetadataParam, GetV1AccountsAccountidResponse200, GetV1AccountsAccountidResponse401, GetV1AccountsAccountidResponse403, GetV1AccountsAccountidResponse404, GetV1AccountsAccountidResponse429, GetV1AccountsMeMetadataParam, GetV1AccountsMeResponse200, GetV1AccountsMeResponse401, GetV1AccountsMeResponse403, GetV1AccountsMeResponse404, GetV1AccountsMeResponse429, GetV1AccountsMetadataParam, GetV1AccountsResponse200, GetV1AccountsResponse401, GetV1AccountsResponse403, GetV1AccountsResponse429, GetV1AlertchannelsIdMetadataParam, GetV1AlertchannelsIdResponse200, GetV1AlertchannelsIdResponse401, GetV1AlertchannelsIdResponse403, GetV1AlertchannelsIdResponse404, GetV1AlertchannelsIdResponse429, GetV1AlertchannelsMetadataParam, GetV1AlertchannelsResponse200, GetV1AlertchannelsResponse401, GetV1AlertchannelsResponse403, GetV1AlertchannelsResponse429, GetV1AlertnotificationsMetadataParam, GetV1AlertnotificationsResponse200, GetV1AlertnotificationsResponse401, GetV1AlertnotificationsResponse402, GetV1AlertnotificationsResponse403, GetV1AlertnotificationsResponse429, GetV1AnalyticsApichecksIdMetadataParam, GetV1AnalyticsApichecksIdResponse200, GetV1AnalyticsApichecksIdResponse401, GetV1AnalyticsApichecksIdResponse403, GetV1AnalyticsApichecksIdResponse429, GetV1AnalyticsBrowserchecksIdMetadataParam, GetV1AnalyticsBrowserchecksIdResponse200, GetV1AnalyticsBrowserchecksIdResponse401, GetV1AnalyticsBrowserchecksIdResponse403, GetV1AnalyticsBrowserchecksIdResponse429, GetV1AnalyticsHeartbeatchecksIdMetadataParam, GetV1AnalyticsHeartbeatchecksIdResponse200, GetV1AnalyticsHeartbeatchecksIdResponse401, GetV1AnalyticsHeartbeatchecksIdResponse403, GetV1AnalyticsHeartbeatchecksIdResponse429, GetV1AnalyticsMetricsMetadataParam, GetV1AnalyticsMetricsResponse200, GetV1AnalyticsMetricsResponse401, GetV1AnalyticsMetricsResponse403, GetV1AnalyticsMetricsResponse429, GetV1AnalyticsMultistepchecksIdMetadataParam, GetV1AnalyticsMultistepchecksIdResponse200, GetV1AnalyticsMultistepchecksIdResponse401, GetV1AnalyticsMultistepchecksIdResponse403, GetV1AnalyticsMultistepchecksIdResponse429, GetV1BadgesChecksCheckidMetadataParam, GetV1BadgesChecksCheckidResponse200, GetV1BadgesGroupsGroupidMetadataParam, GetV1BadgesGroupsGroupidResponse200, GetV1CheckalertsCheckidMetadataParam, GetV1CheckalertsCheckidResponse200, GetV1CheckalertsCheckidResponse401, GetV1CheckalertsCheckidResponse403, GetV1CheckalertsCheckidResponse404, GetV1CheckalertsCheckidResponse429, GetV1CheckalertsMetadataParam, GetV1CheckalertsResponse200, GetV1CheckalertsResponse401, GetV1CheckalertsResponse403, GetV1CheckalertsResponse404, GetV1CheckalertsResponse429, GetV1CheckgroupsGroupidChecksCheckidMetadataParam, GetV1CheckgroupsGroupidChecksCheckidResponse200, GetV1CheckgroupsGroupidChecksCheckidResponse401, GetV1CheckgroupsGroupidChecksCheckidResponse403, GetV1CheckgroupsGroupidChecksCheckidResponse404, GetV1CheckgroupsGroupidChecksCheckidResponse429, GetV1CheckgroupsIdChecksMetadataParam, GetV1CheckgroupsIdChecksResponse200, GetV1CheckgroupsIdChecksResponse401, GetV1CheckgroupsIdChecksResponse403, GetV1CheckgroupsIdChecksResponse404, GetV1CheckgroupsIdChecksResponse429, GetV1CheckgroupsIdMetadataParam, GetV1CheckgroupsIdResponse200, GetV1CheckgroupsIdResponse401, GetV1CheckgroupsIdResponse403, GetV1CheckgroupsIdResponse404, GetV1CheckgroupsIdResponse429, GetV1CheckgroupsMetadataParam, GetV1CheckgroupsResponse200, GetV1CheckgroupsResponse401, GetV1CheckgroupsResponse403, GetV1CheckgroupsResponse429, GetV1CheckresultsCheckidCheckresultidMetadataParam, GetV1CheckresultsCheckidCheckresultidResponse200, GetV1CheckresultsCheckidCheckresultidResponse401, GetV1CheckresultsCheckidCheckresultidResponse403, GetV1CheckresultsCheckidCheckresultidResponse404, GetV1CheckresultsCheckidCheckresultidResponse429, GetV1CheckresultsCheckidMetadataParam, GetV1CheckresultsCheckidResponse200, GetV1CheckresultsCheckidResponse401, GetV1CheckresultsCheckidResponse402, GetV1CheckresultsCheckidResponse403, GetV1CheckresultsCheckidResponse429, GetV1ChecksHeartbeatsCheckidAvailabilityMetadataParam, GetV1ChecksHeartbeatsCheckidAvailabilityResponse200, GetV1ChecksHeartbeatsCheckidAvailabilityResponse401, GetV1ChecksHeartbeatsCheckidAvailabilityResponse403, GetV1ChecksHeartbeatsCheckidAvailabilityResponse404, GetV1ChecksHeartbeatsCheckidAvailabilityResponse429, GetV1ChecksHeartbeatsCheckidEventsIdMetadataParam, GetV1ChecksHeartbeatsCheckidEventsIdResponse200, GetV1ChecksHeartbeatsCheckidEventsIdResponse401, GetV1ChecksHeartbeatsCheckidEventsIdResponse403, GetV1ChecksHeartbeatsCheckidEventsIdResponse404, GetV1ChecksHeartbeatsCheckidEventsIdResponse429, GetV1ChecksHeartbeatsCheckidEventsMetadataParam, GetV1ChecksHeartbeatsCheckidEventsResponse200, GetV1ChecksHeartbeatsCheckidEventsResponse401, GetV1ChecksHeartbeatsCheckidEventsResponse403, GetV1ChecksHeartbeatsCheckidEventsResponse404, GetV1ChecksHeartbeatsCheckidEventsResponse429, GetV1ChecksIdMetadataParam, GetV1ChecksIdResponse200, GetV1ChecksIdResponse401, GetV1ChecksIdResponse403, GetV1ChecksIdResponse404, GetV1ChecksIdResponse429, GetV1ChecksMetadataParam, GetV1ChecksResponse200, GetV1ChecksResponse401, GetV1ChecksResponse403, GetV1ChecksResponse429, GetV1CheckstatusesCheckidMetadataParam, GetV1CheckstatusesCheckidResponse200, GetV1CheckstatusesCheckidResponse401, GetV1CheckstatusesCheckidResponse403, GetV1CheckstatusesCheckidResponse404, GetV1CheckstatusesCheckidResponse429, GetV1CheckstatusesMetadataParam, GetV1CheckstatusesResponse200, GetV1CheckstatusesResponse401, GetV1CheckstatusesResponse403, GetV1CheckstatusesResponse404, GetV1CheckstatusesResponse429, GetV1ClientcertificatesIdMetadataParam, GetV1ClientcertificatesIdResponse200, GetV1ClientcertificatesIdResponse401, GetV1ClientcertificatesIdResponse403, GetV1ClientcertificatesIdResponse429, GetV1ClientcertificatesMetadataParam, GetV1ClientcertificatesResponse200, GetV1ClientcertificatesResponse401, GetV1ClientcertificatesResponse403, GetV1ClientcertificatesResponse429, GetV1DashboardsDashboardidMetadataParam, GetV1DashboardsDashboardidResponse200, GetV1DashboardsDashboardidResponse401, GetV1DashboardsDashboardidResponse403, GetV1DashboardsDashboardidResponse404, GetV1DashboardsDashboardidResponse429, GetV1DashboardsMetadataParam, GetV1DashboardsResponse200, GetV1DashboardsResponse401, GetV1DashboardsResponse403, GetV1DashboardsResponse429, GetV1IncidentsIdMetadataParam, GetV1IncidentsIdResponse200, GetV1IncidentsIdResponse401, GetV1IncidentsIdResponse403, GetV1IncidentsIdResponse404, GetV1IncidentsIdResponse429, GetV1LocationsMetadataParam, GetV1LocationsResponse200, GetV1LocationsResponse429, GetV1MaintenancewindowsIdMetadataParam, GetV1MaintenancewindowsIdResponse200, GetV1MaintenancewindowsIdResponse401, GetV1MaintenancewindowsIdResponse403, GetV1MaintenancewindowsIdResponse404, GetV1MaintenancewindowsIdResponse429, GetV1MaintenancewindowsMetadataParam, GetV1MaintenancewindowsResponse200, GetV1MaintenancewindowsResponse401, GetV1MaintenancewindowsResponse403, GetV1MaintenancewindowsResponse429, GetV1PrivatelocationsIdMetadataParam, GetV1PrivatelocationsIdMetricsMetadataParam, GetV1PrivatelocationsIdMetricsResponse200, GetV1PrivatelocationsIdMetricsResponse401, GetV1PrivatelocationsIdMetricsResponse403, GetV1PrivatelocationsIdMetricsResponse429, GetV1PrivatelocationsIdResponse200, GetV1PrivatelocationsIdResponse401, GetV1PrivatelocationsIdResponse403, GetV1PrivatelocationsIdResponse404, GetV1PrivatelocationsIdResponse429, GetV1PrivatelocationsMetadataParam, GetV1PrivatelocationsResponse200, GetV1PrivatelocationsResponse401, GetV1PrivatelocationsResponse403, GetV1PrivatelocationsResponse429, GetV1ReportingMetadataParam, GetV1ReportingResponse200, GetV1ReportingResponse401, GetV1ReportingResponse403, GetV1ReportingResponse429, GetV1RuntimesIdMetadataParam, GetV1RuntimesIdResponse200, GetV1RuntimesIdResponse404, GetV1RuntimesIdResponse429, GetV1RuntimesMetadataParam, GetV1RuntimesResponse200, GetV1RuntimesResponse429, GetV1SnippetsIdMetadataParam, GetV1SnippetsIdResponse200, GetV1SnippetsIdResponse401, GetV1SnippetsIdResponse403, GetV1SnippetsIdResponse404, GetV1SnippetsIdResponse429, GetV1SnippetsMetadataParam, GetV1SnippetsResponse200, GetV1SnippetsResponse401, GetV1SnippetsResponse403, GetV1SnippetsResponse429, GetV1StaticipsMetadataParam, GetV1StaticipsResponse429, GetV1StaticipsbyregionMetadataParam, GetV1StaticipsbyregionResponse429, GetV1StaticipstxtMetadataParam, GetV1StaticipstxtResponse429, GetV1Staticipv6SMetadataParam, GetV1Staticipv6SResponse429, GetV1Staticipv6SbyregionMetadataParam, GetV1Staticipv6SbyregionResponse429, GetV1Staticipv6StxtMetadataParam, GetV1Staticipv6StxtResponse429, GetV1TriggersCheckgroupsGroupidMetadataParam, GetV1TriggersCheckgroupsGroupidResponse200, GetV1TriggersCheckgroupsGroupidResponse401, GetV1TriggersCheckgroupsGroupidResponse403, GetV1TriggersCheckgroupsGroupidResponse429, GetV1TriggersChecksCheckidMetadataParam, GetV1TriggersChecksCheckidResponse200, GetV1TriggersChecksCheckidResponse401, GetV1TriggersChecksCheckidResponse403, GetV1TriggersChecksCheckidResponse429, GetV1VariablesKeyMetadataParam, GetV1VariablesKeyResponse200, GetV1VariablesKeyResponse401, GetV1VariablesKeyResponse403, GetV1VariablesKeyResponse404, GetV1VariablesKeyResponse429, GetV1VariablesMetadataParam, GetV1VariablesResponse200, GetV1VariablesResponse401, GetV1VariablesResponse403, GetV1VariablesResponse429, PostV1AlertchannelsBodyParam, PostV1AlertchannelsMetadataParam, PostV1AlertchannelsResponse201, PostV1AlertchannelsResponse401, PostV1AlertchannelsResponse402, PostV1AlertchannelsResponse403, PostV1AlertchannelsResponse429, PostV1CheckgroupsBodyParam, PostV1CheckgroupsMetadataParam, PostV1CheckgroupsResponse201, PostV1CheckgroupsResponse401, PostV1CheckgroupsResponse402, PostV1CheckgroupsResponse403, PostV1CheckgroupsResponse429, PostV1ChecksApiBodyParam, PostV1ChecksApiMetadataParam, PostV1ChecksApiResponse201, PostV1ChecksApiResponse401, PostV1ChecksApiResponse402, PostV1ChecksApiResponse403, PostV1ChecksApiResponse429, PostV1ChecksBodyParam, PostV1ChecksBrowserBodyParam, PostV1ChecksBrowserMetadataParam, PostV1ChecksBrowserResponse201, PostV1ChecksBrowserResponse401, PostV1ChecksBrowserResponse402, PostV1ChecksBrowserResponse403, PostV1ChecksBrowserResponse429, PostV1ChecksHeartbeatBodyParam, PostV1ChecksHeartbeatMetadataParam, PostV1ChecksHeartbeatResponse201, PostV1ChecksHeartbeatResponse401, PostV1ChecksHeartbeatResponse402, PostV1ChecksHeartbeatResponse403, PostV1ChecksHeartbeatResponse429, PostV1ChecksMetadataParam, PostV1ChecksMultistepBodyParam, PostV1ChecksMultistepMetadataParam, PostV1ChecksMultistepResponse201, PostV1ChecksMultistepResponse401, PostV1ChecksMultistepResponse402, PostV1ChecksMultistepResponse403, PostV1ChecksMultistepResponse429, PostV1ChecksResponse201, PostV1ChecksResponse401, PostV1ChecksResponse402, PostV1ChecksResponse403, PostV1ChecksResponse429, PostV1ClientcertificatesBodyParam, PostV1ClientcertificatesMetadataParam, PostV1ClientcertificatesResponse201, PostV1ClientcertificatesResponse401, PostV1ClientcertificatesResponse403, PostV1ClientcertificatesResponse429, PostV1DashboardsBodyParam, PostV1DashboardsMetadataParam, PostV1DashboardsResponse201, PostV1DashboardsResponse401, PostV1DashboardsResponse403, PostV1DashboardsResponse409, PostV1DashboardsResponse429, PostV1IncidentsBodyParam, PostV1IncidentsIncidentidUpdatesBodyParam, PostV1IncidentsIncidentidUpdatesMetadataParam, PostV1IncidentsIncidentidUpdatesResponse200, PostV1IncidentsIncidentidUpdatesResponse401, PostV1IncidentsIncidentidUpdatesResponse403, PostV1IncidentsIncidentidUpdatesResponse404, PostV1IncidentsIncidentidUpdatesResponse429, PostV1IncidentsMetadataParam, PostV1IncidentsResponse200, PostV1IncidentsResponse401, PostV1IncidentsResponse403, PostV1IncidentsResponse404, PostV1IncidentsResponse429, PostV1MaintenancewindowsBodyParam, PostV1MaintenancewindowsMetadataParam, PostV1MaintenancewindowsResponse201, PostV1MaintenancewindowsResponse401, PostV1MaintenancewindowsResponse403, PostV1MaintenancewindowsResponse429, PostV1PrivatelocationsBodyParam, PostV1PrivatelocationsIdKeysMetadataParam, PostV1PrivatelocationsIdKeysResponse201, PostV1PrivatelocationsIdKeysResponse401, PostV1PrivatelocationsIdKeysResponse402, PostV1PrivatelocationsIdKeysResponse403, PostV1PrivatelocationsIdKeysResponse429, PostV1PrivatelocationsMetadataParam, PostV1PrivatelocationsResponse201, PostV1PrivatelocationsResponse401, PostV1PrivatelocationsResponse402, PostV1PrivatelocationsResponse403, PostV1PrivatelocationsResponse429, PostV1SnippetsBodyParam, PostV1SnippetsMetadataParam, PostV1SnippetsResponse201, PostV1SnippetsResponse401, PostV1SnippetsResponse403, PostV1SnippetsResponse429, PostV1TriggersCheckgroupsGroupidMetadataParam, PostV1TriggersCheckgroupsGroupidResponse201, PostV1TriggersCheckgroupsGroupidResponse401, PostV1TriggersCheckgroupsGroupidResponse403, PostV1TriggersCheckgroupsGroupidResponse429, PostV1TriggersChecksCheckidMetadataParam, PostV1TriggersChecksCheckidResponse201, PostV1TriggersChecksCheckidResponse401, PostV1TriggersChecksCheckidResponse403, PostV1TriggersChecksCheckidResponse429, PostV1VariablesBodyParam, PostV1VariablesMetadataParam, PostV1VariablesResponse201, PostV1VariablesResponse401, PostV1VariablesResponse403, PostV1VariablesResponse429, PutV1AlertchannelsIdBodyParam, PutV1AlertchannelsIdMetadataParam, PutV1AlertchannelsIdResponse200, PutV1AlertchannelsIdResponse401, PutV1AlertchannelsIdResponse402, PutV1AlertchannelsIdResponse403, PutV1AlertchannelsIdResponse429, PutV1AlertchannelsIdSubscriptionsBodyParam, PutV1AlertchannelsIdSubscriptionsMetadataParam, PutV1AlertchannelsIdSubscriptionsResponse200, PutV1AlertchannelsIdSubscriptionsResponse401, PutV1AlertchannelsIdSubscriptionsResponse403, PutV1AlertchannelsIdSubscriptionsResponse404, PutV1AlertchannelsIdSubscriptionsResponse429, PutV1CheckgroupsIdBodyParam, PutV1CheckgroupsIdMetadataParam, PutV1CheckgroupsIdResponse200, PutV1CheckgroupsIdResponse401, PutV1CheckgroupsIdResponse403, PutV1CheckgroupsIdResponse404, PutV1CheckgroupsIdResponse429, PutV1ChecksApiIdBodyParam, PutV1ChecksApiIdMetadataParam, PutV1ChecksApiIdResponse200, PutV1ChecksApiIdResponse401, PutV1ChecksApiIdResponse403, PutV1ChecksApiIdResponse429, PutV1ChecksBrowserIdBodyParam, PutV1ChecksBrowserIdMetadataParam, PutV1ChecksBrowserIdResponse200, PutV1ChecksBrowserIdResponse401, PutV1ChecksBrowserIdResponse403, PutV1ChecksBrowserIdResponse429, PutV1ChecksHeartbeatIdBodyParam, PutV1ChecksHeartbeatIdMetadataParam, PutV1ChecksHeartbeatIdResponse200, PutV1ChecksHeartbeatIdResponse401, PutV1ChecksHeartbeatIdResponse403, PutV1ChecksHeartbeatIdResponse429, PutV1ChecksIdBodyParam, PutV1ChecksIdMetadataParam, PutV1ChecksIdResponse200, PutV1ChecksIdResponse401, PutV1ChecksIdResponse403, PutV1ChecksIdResponse429, PutV1ChecksMultistepIdBodyParam, PutV1ChecksMultistepIdMetadataParam, PutV1ChecksMultistepIdResponse200, PutV1ChecksMultistepIdResponse401, PutV1ChecksMultistepIdResponse403, PutV1ChecksMultistepIdResponse429, PutV1DashboardsDashboardidBodyParam, PutV1DashboardsDashboardidMetadataParam, PutV1DashboardsDashboardidResponse200, PutV1DashboardsDashboardidResponse401, PutV1DashboardsDashboardidResponse403, PutV1DashboardsDashboardidResponse404, PutV1DashboardsDashboardidResponse409, PutV1DashboardsDashboardidResponse429, PutV1IncidentsIdBodyParam, PutV1IncidentsIdMetadataParam, PutV1IncidentsIdResponse200, PutV1IncidentsIdResponse401, PutV1IncidentsIdResponse403, PutV1IncidentsIdResponse404, PutV1IncidentsIdResponse429, PutV1IncidentsIncidentidUpdatesIdBodyParam, PutV1IncidentsIncidentidUpdatesIdMetadataParam, PutV1IncidentsIncidentidUpdatesIdResponse200, PutV1IncidentsIncidentidUpdatesIdResponse401, PutV1IncidentsIncidentidUpdatesIdResponse403, PutV1IncidentsIncidentidUpdatesIdResponse404, PutV1IncidentsIncidentidUpdatesIdResponse429, PutV1MaintenancewindowsIdBodyParam, PutV1MaintenancewindowsIdMetadataParam, PutV1MaintenancewindowsIdResponse200, PutV1MaintenancewindowsIdResponse401, PutV1MaintenancewindowsIdResponse403, PutV1MaintenancewindowsIdResponse404, PutV1MaintenancewindowsIdResponse429, PutV1PrivatelocationsIdBodyParam, PutV1PrivatelocationsIdMetadataParam, PutV1PrivatelocationsIdResponse200, PutV1PrivatelocationsIdResponse401, PutV1PrivatelocationsIdResponse403, PutV1PrivatelocationsIdResponse429, PutV1SnippetsIdBodyParam, PutV1SnippetsIdMetadataParam, PutV1SnippetsIdResponse200, PutV1SnippetsIdResponse401, PutV1SnippetsIdResponse403, PutV1SnippetsIdResponse404, PutV1SnippetsIdResponse429, PutV1VariablesKeyBodyParam, PutV1VariablesKeyMetadataParam, PutV1VariablesKeyResponse200, PutV1VariablesKeyResponse401, PutV1VariablesKeyResponse403, PutV1VariablesKeyResponse404, PutV1VariablesKeyResponse429 } from './types';
