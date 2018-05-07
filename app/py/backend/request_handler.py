import requests


def datameer_login(uname, pwd):
    check_request = requests.get('https://datameer.labcorp.com:8443/rest/\
                                user-management/logged-in-user?pretty',
                                auth=(uname, pwd),
                                verify=False)


    if check_request.status_code != 200:
        return("Please enter Correct Datameer credentials")

    else:
        return "Login Successful"


# def oracle_login(uname, pwd, orcl_pwd):
