---
author: Hantong Chen
pubDatetime: 2025-02-11T12:39:25.000+08:00
# modDatetime: 
title: "[Linux deployment SOP] Time synchronization based on systemd-timesyncd"
featured: true
draft: false
tags:
  - linux
  - sop
  - systemd-timesyncd
description: "Linux deployment SOP: time synchronization based on systemd-timesyncd"
---

This SOP is for Debian-based Linux distro, which has been tested on Debian 11 / 12.
`root` is recommended during the deployment, so I don't make use of `sudo`.

## TL, DR

```sh
# Uninstall ntp
apt purge ntp
# Install systemd-timesyncd
apt update && apt install systemd-timesyncd
# Backup the original config
cp /etc/systemd/timesyncd.conf /etc/systemd/timesyncd.conf.bak
# Setting new config, you may adjust NTP / FallbackNTP based on the server's location. 
cat <<'EOF' > /etc/systemd/timesyncd.conf
[Time]
# Main NTP
NTP=time.windows.com
# Fallback NTP
FallbackNTP=pool.ntp.org time1.google.com time1.apple.com time.cloudflare.com time.windows.com time.nist.gov
RootDistanceMaxSec=5
PollIntervalMinSec=5
PollIntervalMaxSec=300
ConnectionRetrySec=30
SaveIntervalSec=60
EOF
# Enable now
systemctl enable --now systemd-timesyncd
```

Then run `timedatectl` and check if system clock were synchronized:

```plaintext
$ timedatectl
               Local time: Tue 2025-02-11 13:01:00 HKT
           Universal time: Tue 2025-02-11 05:01:00 UTC
                 RTC time: Tue 2025-02-11 05:01:00
                Time zone: Asia/Hong_Kong (HKT, +0800)
System clock synchronized: yes # See here!
              NTP service: active
          RTC in local TZ: no
```

You may also need the following:

```sh
# Setting timezone, replace `Asia/Hong_Kong` to what you need.
timedatectl set-timezone Asia/Hong_Kong
# You can search the timezone you need with:
timedatectl list-timezones
```

## Recommended NTP Server

- 中国大陆
  - 中国科学院国家授时中心: `ntp.ntsc.ac.cn` (若您的机器位于中国大陆, 推荐作主 NTP 服务器)
- General
  - NIST: `time.nist.gov`
  - Microsoft: `time.windows.com`
  - Apple: `time1.apple.com`
  - Cloudflare: `time.cloudflare.com`
- IDC Intranet
  - Alibaba Cloud: `ntp.cloud.aliyuncs.com` (See [document](https://www.alibabacloud.com/help/en/ecs/user-guide/alibaba-cloud-ntp-server))
  - Tencent Cloud: `time1.tencentyun.com` (See: [document](https://www.tencentcloud.com/zh/document/product/213/32379))
