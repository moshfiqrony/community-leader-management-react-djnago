from django.db import models


class Districts(models.Model):
    name = models.CharField(max_length=30)


class CL(models.Model):
    phone = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=30)
    name = models.CharField(max_length=30, null=True)
    district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=30, null=True)
    active = models.BooleanField(default=False)


class Agent(models.Model):
    phone = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=30)
    name = models.CharField(max_length=30, null=True)
    district = models.ForeignKey(Districts, on_delete=models.CASCADE, null=True)
    address = models.CharField(max_length=30, null=True)
    asign = models.BooleanField(default=False)
    active = models.BooleanField(default=False)

class Campaign(models.Model):
    name = models.CharField(max_length=30)


class CampaignDetails(models.Model):
    clId = models.ForeignKey(CL, on_delete=models.CASCADE)
    agentId = models.ForeignKey(Agent, on_delete=models.CASCADE)
    campaignId = models.ForeignKey(Campaign, on_delete=models.CASCADE)

class LocationChecklist(models.Model):
    campgDetails = models.ForeignKey(CampaignDetails, on_delete=models.CASCADE)
    date = models.DateField()
    location = models.CharField(max_length=60)


class DataCollectionChecklist(models.Model):
    campgDetails = models.ForeignKey(CampaignDetails, on_delete=models.CASCADE)
    location = models.ForeignKey(LocationChecklist, on_delete=models.CASCADE)
    dataAmount = models.IntegerField()


