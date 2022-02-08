/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/likes": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.likes.id"];
          created_at?: parameters["rowFilter.likes.created_at"];
          updated_at?: parameters["rowFilter.likes.updated_at"];
          user_id?: parameters["rowFilter.likes.user_id"];
          target_id?: parameters["rowFilter.likes.target_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["likes"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** likes */
          likes?: definitions["likes"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.likes.id"];
          created_at?: parameters["rowFilter.likes.created_at"];
          updated_at?: parameters["rowFilter.likes.updated_at"];
          user_id?: parameters["rowFilter.likes.user_id"];
          target_id?: parameters["rowFilter.likes.target_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.likes.id"];
          created_at?: parameters["rowFilter.likes.created_at"];
          updated_at?: parameters["rowFilter.likes.updated_at"];
          user_id?: parameters["rowFilter.likes.user_id"];
          target_id?: parameters["rowFilter.likes.target_id"];
        };
        body: {
          /** likes */
          likes?: definitions["likes"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/profiles": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          user_name?: parameters["rowFilter.profiles.user_name"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          twitter_url?: parameters["rowFilter.profiles.twitter_url"];
          instagram_url?: parameters["rowFilter.profiles.instagram_url"];
          sex?: parameters["rowFilter.profiles.sex"];
          age?: parameters["rowFilter.profiles.age"];
          self_description?: parameters["rowFilter.profiles.self_description"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["profiles"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          user_name?: parameters["rowFilter.profiles.user_name"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          twitter_url?: parameters["rowFilter.profiles.twitter_url"];
          instagram_url?: parameters["rowFilter.profiles.instagram_url"];
          sex?: parameters["rowFilter.profiles.sex"];
          age?: parameters["rowFilter.profiles.age"];
          self_description?: parameters["rowFilter.profiles.self_description"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.profiles.id"];
          updated_at?: parameters["rowFilter.profiles.updated_at"];
          user_name?: parameters["rowFilter.profiles.user_name"];
          avatar_url?: parameters["rowFilter.profiles.avatar_url"];
          website?: parameters["rowFilter.profiles.website"];
          twitter_url?: parameters["rowFilter.profiles.twitter_url"];
          instagram_url?: parameters["rowFilter.profiles.instagram_url"];
          sex?: parameters["rowFilter.profiles.sex"];
          age?: parameters["rowFilter.profiles.age"];
          self_description?: parameters["rowFilter.profiles.self_description"];
        };
        body: {
          /** profiles */
          profiles?: definitions["profiles"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/tags": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.tags.id"];
          created_at?: parameters["rowFilter.tags.created_at"];
          updated_at?: parameters["rowFilter.tags.updated_at"];
          name?: parameters["rowFilter.tags.name"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["tags"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** tags */
          tags?: definitions["tags"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.tags.id"];
          created_at?: parameters["rowFilter.tags.created_at"];
          updated_at?: parameters["rowFilter.tags.updated_at"];
          name?: parameters["rowFilter.tags.name"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.tags.id"];
          created_at?: parameters["rowFilter.tags.created_at"];
          updated_at?: parameters["rowFilter.tags.updated_at"];
          name?: parameters["rowFilter.tags.name"];
        };
        body: {
          /** tags */
          tags?: definitions["tags"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/target_tag": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.target_tag.id"];
          created_at?: parameters["rowFilter.target_tag.created_at"];
          updated_at?: parameters["rowFilter.target_tag.updated_at"];
          target_id?: parameters["rowFilter.target_tag.target_id"];
          tag_id?: parameters["rowFilter.target_tag.tag_id"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["target_tag"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** target_tag */
          target_tag?: definitions["target_tag"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.target_tag.id"];
          created_at?: parameters["rowFilter.target_tag.created_at"];
          updated_at?: parameters["rowFilter.target_tag.updated_at"];
          target_id?: parameters["rowFilter.target_tag.target_id"];
          tag_id?: parameters["rowFilter.target_tag.tag_id"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.target_tag.id"];
          created_at?: parameters["rowFilter.target_tag.created_at"];
          updated_at?: parameters["rowFilter.target_tag.updated_at"];
          target_id?: parameters["rowFilter.target_tag.target_id"];
          tag_id?: parameters["rowFilter.target_tag.tag_id"];
        };
        body: {
          /** target_tag */
          target_tag?: definitions["target_tag"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/targets": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.targets.id"];
          user_id?: parameters["rowFilter.targets.user_id"];
          title?: parameters["rowFilter.targets.title"];
          description?: parameters["rowFilter.targets.description"];
          value?: parameters["rowFilter.targets.value"];
          is_complete?: parameters["rowFilter.targets.is_complete"];
          created_at?: parameters["rowFilter.targets.created_at"];
          ogp_url?: parameters["rowFilter.targets.ogp_url"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["targets"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** targets */
          targets?: definitions["targets"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.targets.id"];
          user_id?: parameters["rowFilter.targets.user_id"];
          title?: parameters["rowFilter.targets.title"];
          description?: parameters["rowFilter.targets.description"];
          value?: parameters["rowFilter.targets.value"];
          is_complete?: parameters["rowFilter.targets.is_complete"];
          created_at?: parameters["rowFilter.targets.created_at"];
          ogp_url?: parameters["rowFilter.targets.ogp_url"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.targets.id"];
          user_id?: parameters["rowFilter.targets.user_id"];
          title?: parameters["rowFilter.targets.title"];
          description?: parameters["rowFilter.targets.description"];
          value?: parameters["rowFilter.targets.value"];
          is_complete?: parameters["rowFilter.targets.is_complete"];
          created_at?: parameters["rowFilter.targets.created_at"];
          ogp_url?: parameters["rowFilter.targets.ogp_url"];
        };
        body: {
          /** targets */
          targets?: definitions["targets"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
  "/user_profile_view": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.user_profile_view.id"];
          user_name?: parameters["rowFilter.user_profile_view.user_name"];
          avatar_url?: parameters["rowFilter.user_profile_view.avatar_url"];
          self_description?: parameters["rowFilter.user_profile_view.self_description"];
          twitter_url?: parameters["rowFilter.user_profile_view.twitter_url"];
          instagram_url?: parameters["rowFilter.user_profile_view.instagram_url"];
          website?: parameters["rowFilter.user_profile_view.website"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["user_profile_view"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
  "/user_target_view": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.user_target_view.id"];
          title?: parameters["rowFilter.user_target_view.title"];
          description?: parameters["rowFilter.user_target_view.description"];
          value?: parameters["rowFilter.user_target_view.value"];
          is_complete?: parameters["rowFilter.user_target_view.is_complete"];
          created_at?: parameters["rowFilter.user_target_view.created_at"];
          ogp_url?: parameters["rowFilter.user_target_view.ogp_url"];
          user_name?: parameters["rowFilter.user_target_view.user_name"];
          avatar_url?: parameters["rowFilter.user_target_view.avatar_url"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["user_target_view"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
  };
}

export interface definitions {
  likes: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at: string;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    updated_at: string;
    /** Format: uuid */
    user_id: string;
    /** Format: bigint */
    target_id: number;
  };
  profiles: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     * This is a Foreign Key to `user_profile_view.id`.<fk table='user_profile_view' column='id'/>
     */
    id: string;
    /** Format: timestamp with time zone */
    updated_at?: string;
    /** Format: text */
    user_name: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    website?: string;
    /** Format: text */
    twitter_url?: string;
    /** Format: text */
    instagram_url?: string;
    /** Format: smallint */
    sex?: number;
    /** Format: integer */
    age?: number;
    /** Format: text */
    self_description?: string;
  };
  tags: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default timezone('utc'::text, now())
     */
    created_at: string;
    /**
     * Format: timestamp with time zone
     * @default timezone('utc'::text, now())
     */
    updated_at: string;
    /** Format: text */
    name?: string;
  };
  target_tag: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at: string;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    updated_at: string;
    /** Format: bigint */
    target_id?: number;
    /** Format: bigint */
    tag_id?: number;
  };
  targets: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id: number;
    /**
     * Format: uuid
     * @description Note:
     * This is a Foreign Key to `user_profile_view.id`.<fk table='user_profile_view' column='id'/>
     */
    user_id: string;
    /** Format: text */
    title: string;
    /** Format: text */
    description?: string;
    /** Format: integer */
    value: number;
    /** Format: boolean */
    is_complete: boolean;
    /**
     * Format: timestamp with time zone
     * @default (now() AT TIME ZONE 'utc'::text)
     */
    created_at: string;
    /** Format: text */
    ogp_url?: string;
  };
  user_profile_view: {
    /**
     * Format: uuid
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id?: string;
    /** Format: text */
    user_name?: string;
    /** Format: text */
    avatar_url?: string;
    /** Format: text */
    self_description?: string;
    /** Format: text */
    twitter_url?: string;
    /** Format: text */
    instagram_url?: string;
    /** Format: text */
    website?: string;
  };
  user_target_view: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id?: number;
    /** Format: text */
    title?: string;
    /** Format: text */
    description?: string;
    /** Format: integer */
    value?: number;
    /** Format: boolean */
    is_complete?: boolean;
    /** Format: timestamp with time zone */
    created_at?: string;
    /** Format: text */
    ogp_url?: string;
    /** Format: text */
    user_name?: string;
    /** Format: text */
    avatar_url?: string;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description likes */
  "body.likes": definitions["likes"];
  /** Format: bigint */
  "rowFilter.likes.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.likes.created_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.likes.updated_at": string;
  /** Format: uuid */
  "rowFilter.likes.user_id": string;
  /** Format: bigint */
  "rowFilter.likes.target_id": string;
  /** @description profiles */
  "body.profiles": definitions["profiles"];
  /** Format: uuid */
  "rowFilter.profiles.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.profiles.updated_at": string;
  /** Format: text */
  "rowFilter.profiles.user_name": string;
  /** Format: text */
  "rowFilter.profiles.avatar_url": string;
  /** Format: text */
  "rowFilter.profiles.website": string;
  /** Format: text */
  "rowFilter.profiles.twitter_url": string;
  /** Format: text */
  "rowFilter.profiles.instagram_url": string;
  /** Format: smallint */
  "rowFilter.profiles.sex": string;
  /** Format: integer */
  "rowFilter.profiles.age": string;
  /** Format: text */
  "rowFilter.profiles.self_description": string;
  /** @description tags */
  "body.tags": definitions["tags"];
  /** Format: bigint */
  "rowFilter.tags.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.tags.created_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.tags.updated_at": string;
  /** Format: text */
  "rowFilter.tags.name": string;
  /** @description target_tag */
  "body.target_tag": definitions["target_tag"];
  /** Format: bigint */
  "rowFilter.target_tag.id": string;
  /** Format: timestamp with time zone */
  "rowFilter.target_tag.created_at": string;
  /** Format: timestamp with time zone */
  "rowFilter.target_tag.updated_at": string;
  /** Format: bigint */
  "rowFilter.target_tag.target_id": string;
  /** Format: bigint */
  "rowFilter.target_tag.tag_id": string;
  /** @description targets */
  "body.targets": definitions["targets"];
  /** Format: bigint */
  "rowFilter.targets.id": string;
  /** Format: uuid */
  "rowFilter.targets.user_id": string;
  /** Format: text */
  "rowFilter.targets.title": string;
  /** Format: text */
  "rowFilter.targets.description": string;
  /** Format: integer */
  "rowFilter.targets.value": string;
  /** Format: boolean */
  "rowFilter.targets.is_complete": string;
  /** Format: timestamp with time zone */
  "rowFilter.targets.created_at": string;
  /** Format: text */
  "rowFilter.targets.ogp_url": string;
  /** @description user_profile_view */
  "body.user_profile_view": definitions["user_profile_view"];
  /** Format: uuid */
  "rowFilter.user_profile_view.id": string;
  /** Format: text */
  "rowFilter.user_profile_view.user_name": string;
  /** Format: text */
  "rowFilter.user_profile_view.avatar_url": string;
  /** Format: text */
  "rowFilter.user_profile_view.self_description": string;
  /** Format: text */
  "rowFilter.user_profile_view.twitter_url": string;
  /** Format: text */
  "rowFilter.user_profile_view.instagram_url": string;
  /** Format: text */
  "rowFilter.user_profile_view.website": string;
  /** @description user_target_view */
  "body.user_target_view": definitions["user_target_view"];
  /** Format: bigint */
  "rowFilter.user_target_view.id": string;
  /** Format: text */
  "rowFilter.user_target_view.title": string;
  /** Format: text */
  "rowFilter.user_target_view.description": string;
  /** Format: integer */
  "rowFilter.user_target_view.value": string;
  /** Format: boolean */
  "rowFilter.user_target_view.is_complete": string;
  /** Format: timestamp with time zone */
  "rowFilter.user_target_view.created_at": string;
  /** Format: text */
  "rowFilter.user_target_view.ogp_url": string;
  /** Format: text */
  "rowFilter.user_target_view.user_name": string;
  /** Format: text */
  "rowFilter.user_target_view.avatar_url": string;
}

export interface operations {}

export interface external {}
