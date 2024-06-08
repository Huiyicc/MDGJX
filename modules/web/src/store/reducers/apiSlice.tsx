
// Date: Sun, 24 Sep 2023
// Author: LafTools Team <work7z@outlook.com>
// Description:
// Copyright (C) 2023 - Present, https://codegen.cc
// License: AGPLv3

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import _ from "lodash";
import { PayloadListData, PayloadValueData } from "../../constants";
import { url } from "inspector";
import { getHeaders } from "../request";
import { HEADER_X_LAF_PAGE_SESSION_ID, HEADER_X_LAF_TOKEN, URL_AUTH_GET_FINDPW, URL_AUTH_GET_SIGNIN, URL_AUTH_GET_SIGNOUT, URL_AUTH_GET_SIGNUP } from "../constants/api_constants";
import AlertUtils from "@/utils/AlertUtils";
import { FN_GetDispatch, FN_GetState } from "../nocycle";
import UsersSlice, { DisplayUserInfo } from "./userSlice";
import AuthUtils from "@/utils/AuthUtils";
import { PAGE_SESSION_ID } from "@/utils/PageUtils";


export type FindPwReq = {
  email: string;
  password: string;
  confirmPassword: string;
};
export type TellMeVCode4FindPwReq = {
  email: string;
  vcode: string;
};
export type TellMeVCodeRes = {
  verified: boolean;
};
export type FindPwRes = {
  data: {};
};

const URL_PREFIX_LOCAL = '/v3'
export type SignInCredentials = {
  signed: boolean;
  signature: string | null;
};
export type AsyncCreateResponse<T> = {
  message?: string; // normal message
  error?: string; // error
  data?: T;
};

export type SystemRefresh = {
  initCount: number
}
export type TLNRequest = {
  text: string;
  type: string;
  id:string
  sourceLang: string;
  targetLang: string;
  reservedWords: string;
  extraRequests: string;
};
export type TLNResponse = {
  result: string
}
export type TLNRequestIdRes = {
  requestId: string;
};
export type I18nItem = {
  langInHttpLocaleCode?: string[];
  label: string[];
  labelByLang: string;
  value: string;
  labelInEnglish: string;
  LangInExplicitURL?: string;
};


export class S2GiftCard {
  declare id?: number;
  declare giftCardCode: string;
  declare giftCardType: string;
  declare totalDays: number;
  declare remarks: string;
  declare usedByWho: number; // userId
  declare sourceType: string;
  declare createdAt: Date | null;
  declare updatedAt: Date | null;
  declare deleteAt: Date | null;
}

export type DisplayUserAcctDetail = {
  usedTokenCount: number;
  totalTokenCount: number;
};

export let verifyResponse = (response: AsyncCreateResponse<any> | undefined): boolean => {
  if (!response || response.error) {
    if (response) {
      AlertUtils.alertErr(response.error)
    }
    return false;
  } else {
    return true;
  }
}

export type CommonVerDetail = {
  version: string;
  description: string;
  releaseDate: string,
  timestamp: string
};
export type RawChangeLogStruct = {
  desktop2: CommonVerDetail[];
  web2: CommonVerDetail[];
};
export type SysConfChangeLogResponse = {
  type: string;
  timestamp: string;
  updates: CommonVerDetail[];
};

export const msg_showNetworkWithDebounce  = _.throttle(()=>{
  AlertUtils.alertErr('抱歉，网络不稳定，请稍后重试')
},10*1000)
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    // Fill in your own server starting URL here
    baseUrl: URL_PREFIX_LOCAL,
    prepareHeaders(headers, api) {
      let headers_New = getHeaders();
      _.forEach(headers_New, (x, d, n) => {
        if (!_.isNil(x)) {
          headers.set(d, x);
        }
      });
      headers.set(HEADER_X_LAF_TOKEN, AuthUtils.token || '')
      headers.set(HEADER_X_LAF_PAGE_SESSION_ID, PAGE_SESSION_ID || '')
      return headers;
    },
    validateStatus: (response, result: AsyncCreateResponse<any> | null) => {
      let errorHandler = () => {
        const finalResult: string | null = result && result.message ? result.message : result && result.error ? result.error :null
        if(!finalResult){
          // "抱歉，网络不稳定，请稍后重试"
          msg_showNetworkWithDebounce()
        }else{
          AlertUtils.alertErr(finalResult)
        }
      }
      if (result) {
        let error = result.error;
        if (error == '401') {
          const pre_hasSignIn = FN_GetState().users.hasSignIn
          FN_GetDispatch()(
            UsersSlice.actions.updateOneOfParamState({
              hasSignIn: false,
            })
          )
          if (pre_hasSignIn) {
            AlertUtils.alertErr("登录已过期，请重新登录")
          }
          return false;
        }
      }
      let shouldOk = response && response.status === 200
      if (!shouldOk) {
        errorHandler()
      }
      return shouldOk;
    },
  }),
  endpoints: (build) => ({
    sayHelloWorld: build.query<string, void>({
      query: () => {
        return {
          url: "/hello-world",
          method: "GET",
        };
      },
    }),
    // sysconf 
    getSysConfChangeLog: build.query <AsyncCreateResponse<SysConfChangeLogResponse>, {
      currentVer?:string,
      checkType:'web2'|'desktop2'
    }>({
      query: (params) => {
        return {
          params,
          url: "/sysconf/changelog",
          method: "GET",
        };
      },
    }),
    // auth
    signIn: build.query<AsyncCreateResponse<SignInCredentials>, {
      userName: string,
      password: string,
      rememberMe: boolean,
    }>({
      query: (obj) => {
        return {
          method: "POST",
          url: URL_AUTH_GET_SIGNIN,
          body: obj,
        };
      },
    }),
    signUp: build.query<AsyncCreateResponse<SignInCredentials>, {
      preview: boolean,
      userName: string,
      password: string,
      email: string,
      confirmPassword: string,
      rememberMe: boolean,
    }>({
      query: (obj) => {
        return {
          method: "POST",
          url: URL_AUTH_GET_SIGNUP,
          body: obj
        };
      },
    }),
    signOut: build.query<AsyncCreateResponse<any>, { username: string; password: string }>({
      query: (obj) => {
        return {
          method: "POST",
          url: URL_AUTH_GET_SIGNOUT,
          body: obj
        };
      },
    }),
    sendFeedback: build.query<AsyncCreateResponse<any>, {
      email: string,
      subject: string,
      content: string,
    }>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/help/sendFeedback",
          body: obj
        };
      },
    }),
    // 
    getUserInfo: build.query<AsyncCreateResponse<DisplayUserInfo>, {} & SystemRefresh>({
      query: (obj) => {
        return {
          method: "GET",
          url: "/auth/getUserInfo",
        };
      },
    }),
    mailFindPw: build.query<AsyncCreateResponse<FindPwRes>, FindPwReq>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/auth/mailFindPw",
          body: obj,
        };
      },
    }),
    getFurtherAcctDetail: build.query<AsyncCreateResponse<DisplayUserAcctDetail>, {} & SystemRefresh>({
      query: (obj) => {
        return {
          method: "GET",
          url: (
            "/user/getFurtherAcctDetail"
          ),
        };
      },
    }),
    getGiftCardList: build.query<AsyncCreateResponse<S2GiftCard[]>, {}>({
      query: (obj) => {
        return {
          method: "GET",
          url: (
            "/user/getGiftCardList"
          ),
        };
      },
    }),
    tellMeVCode4FindPw: build.query<AsyncCreateResponse<TellMeVCodeRes>, TellMeVCode4FindPwReq>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/auth/tellMeVCode4FindPw",
          body: obj,
        };
      },
    }),
    tlnSendRequest: build.query<AsyncCreateResponse<TLNResponse>, TLNRequest>({
      query: (obj) => {
        return {
          method: "POST",
          url: "/tln/sendTLNRequest",
          body: obj,
        };
      },
    }),
    tlnGetI18nItems: build.query<AsyncCreateResponse<I18nItem[]>, {}>({
      query: (obj) => {
        return {
          method: "GET",
          url: (
            "/tln/getI18nItems"
          ),
        };
      },
    }),

  }),
});



export default apiSlice;
