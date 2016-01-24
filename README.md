## Magic mirror with motion sensor

Built using Raspberry Pi (running Raspbian Jessie), Python/Flask and a bit of shell

*Note:* There was a news ticker in there but it was a bit too choppy for my liking. The code is still in there though


### **My notes**

#### First things first
`sudo raspi-config` and change keyboard, localization (timezone important for clock) and expand storage or whatever, then reboot (sudo reboot)

```
sudo pip install flask
sudo pip install RPi.GPIO
sudo apt-get install upgrade
sudo apt-get install update
sudo apt-get install unclutter
```


#### /boot/config.txt:
- uncomment `disable_overscan=1` to make sure display fully occupies monitor
- rotate monitor 90 or 270 by adding in `display_rotate=#` where # is 1 or 3, respectively

Also this may help if you're having problems `hdmi_force_hotplug=1` and `hdmi_drive=2`
[Source](https://raspberrypi.stackexchange.com/questions/2169/how-do-i-force-the-raspberry-pi-to-turn-on-hdmi)


#### Getting Chromium
[This guy knows what's up](http://conoroneill.net/running-the-latest-chromium-45-on-debian-jessie-on-your-raspberry-pi-2/)
*Note:* I didn’t expand my harddrive first and it bricked the OS on restart

#### On-boot stuff happens here
```sudo nano ~/.config/lxsession/LXDE-pi/autostart```

*Note:* `/etc/xdg/lxsession/LXDE/autostart` and `/etc/xdg/lxsession/LXDE-pi/autostart` are old/not working from what I gathered

Add below other stuff:

```
@xset s off
@xset -dpms
@xset s noblank
@unclutter -idle 1
@sudo /usr/bin/python /home/pi/Documents/magic_mirror/motion.py
@sudo /usr/bin/python /home/pi/Documents/magic_mirror/app.py
@chromium-browser --incognito --kiosk http://localhost:8000/
```

#### Sources

[Source 1](http://www.ofbrooklyn.com/2014/01/2/building-photo-frame-raspberry-pi-motion-detector/)

[Source 2](http://michaelteeuw.nl/post/83188136918/magic-mirror-part-v-installing-the-raspberry-pi)

[Source 3](https://helentronica.wordpress.com/2016/01/11/magic-mirror-with-motion-detector/)

#### Screenshot
![Screenshot](https://imgur.com/aKV1Zp6)


