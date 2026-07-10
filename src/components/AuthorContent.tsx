/** 文件说明：作者页 noscript 内容组件，为不执行 JavaScript 的抓取环境输出纯 HTML 文本。 */
import translations from "@/i18n/translations";

const en = translations.en;
const zh = translations.zh;

/**
 * 输出作者页的服务端静态文本内容。
 *
 * 该组件包裹在 <noscript> 中，用于为不执行客户端脚本的搜索引擎
 * 提供作者背景、团队信息与公开资料链接，增强作者页可索引性。
 */
export default function AuthorContent() {
  return (
    <noscript>
      <section lang="en">
        <h1>{en.author.pageTitle}</h1>
        <p>{en.author.pageSubtitle}</p>
        <p>{en.author.intro}</p>

        <div>
          <h2>{en.author.profileTitle}</h2>
          <h3>{en.author.profileName}</h3>
          <p>{en.author.profileRole}</p>
          <p>{en.author.profileDesc}</p>
        </div>

        <div>
          <h2>{en.landing.aboutSectionTitle}</h2>
          <div>
            <h3>{en.landing.aboutWhyTitle}</h3>
            <p>{en.landing.aboutWhyDesc}</p>
          </div>
          <div>
            <h3>{en.landing.aboutPrivacyTitle}</h3>
            <p>{en.landing.aboutPrivacyDesc}</p>
          </div>
          <div>
            <h3>{en.landing.aboutMindRoseTitle}</h3>
            <p>{en.landing.aboutMindRoseDesc}</p>
          </div>
          <div>
            <h3>{en.landing.aboutContactTitle}</h3>
            <p>{en.landing.aboutContactDesc}</p>
            <p>{en.landing.aboutContactService}</p>
            <p>
              {en.landing.aboutContactCTA}{" "}
              <a href="mailto:hello@mindrose.xyz">hello@mindrose.xyz</a>
            </p>
          </div>
        </div>

        <div>
          <h2>{en.author.verificationTitle}</h2>
          <p>
            <a href="https://www.linkedin.com/in/gavinchensongwen3188536a/">
              {en.author.linkedInLabel}
            </a>
          </p>
          <p>
            <a href="https://github.com/GavinCnod/deepseek-api-usage-analysis">
              {en.author.githubLabel}
            </a>
          </p>
          <p>
            <a href="https://mindrose.xyz">{en.author.websiteLabel}</a>
          </p>
        </div>

        <div id="team-members">
          <h2>{en.author.teamMembersTitle}</h2>
          <p>{en.author.teamMembersDesc}</p>
          <div>
            {[
              {
                name: en.author.member1Name,
                role: en.author.member1Role,
                desc: en.author.member1Desc,
              },
              {
                name: en.author.member2Name,
                role: en.author.member2Role,
                desc: en.author.member2Desc,
              },
              {
                name: en.author.member3Name,
                role: en.author.member3Role,
                desc: en.author.member3Desc,
              },
              {
                name: en.author.member4Name,
                role: en.author.member4Role,
                desc: en.author.member4Desc,
              },
            ].map((member, i) => (
              <div key={i}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section lang="zh">
        <h1>{zh.author.pageTitle}</h1>
        <p>{zh.author.pageSubtitle}</p>
        <p>{zh.author.intro}</p>

        <div>
          <h2>{zh.author.profileTitle}</h2>
          <h3>{zh.author.profileName}</h3>
          <p>{zh.author.profileRole}</p>
          <p>{zh.author.profileDesc}</p>
        </div>

        <div>
          <h2>{zh.landing.aboutSectionTitle}</h2>
          <div>
            <h3>{zh.landing.aboutWhyTitle}</h3>
            <p>{zh.landing.aboutWhyDesc}</p>
          </div>
          <div>
            <h3>{zh.landing.aboutPrivacyTitle}</h3>
            <p>{zh.landing.aboutPrivacyDesc}</p>
          </div>
          <div>
            <h3>{zh.landing.aboutMindRoseTitle}</h3>
            <p>{zh.landing.aboutMindRoseDesc}</p>
          </div>
          <div>
            <h3>{zh.landing.aboutContactTitle}</h3>
            <p>{zh.landing.aboutContactDesc}</p>
            <p>{zh.landing.aboutContactService}</p>
            <p>
              {zh.landing.aboutContactCTA}{" "}
              <a href="mailto:hello@mindrose.xyz">hello@mindrose.xyz</a>
            </p>
          </div>
        </div>

        <div>
          <h2>{zh.author.verificationTitle}</h2>
          <p>
            <a href="https://www.linkedin.com/in/gavinchensongwen3188536a/">
              {zh.author.linkedInLabel}
            </a>
          </p>
          <p>
            <a href="https://github.com/GavinCnod/deepseek-api-usage-analysis">
              {zh.author.githubLabel}
            </a>
          </p>
          <p>
            <a href="https://mindrose.xyz">{zh.author.websiteLabel}</a>
          </p>
        </div>

        <div id="team-members">
          <h2>{zh.author.teamMembersTitle}</h2>
          <p>{zh.author.teamMembersDesc}</p>
          <div>
            {[
              {
                name: zh.author.member1Name,
                role: zh.author.member1Role,
                desc: zh.author.member1Desc,
              },
              {
                name: zh.author.member2Name,
                role: zh.author.member2Role,
                desc: zh.author.member2Desc,
              },
              {
                name: zh.author.member3Name,
                role: zh.author.member3Role,
                desc: zh.author.member3Desc,
              },
              {
                name: zh.author.member4Name,
                role: zh.author.member4Role,
                desc: zh.author.member4Desc,
              },
            ].map((member, i) => (
              <div key={i}>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
                <p>{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </noscript>
  );
}
